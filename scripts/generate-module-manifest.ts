#!/usr/bin/env node

/**
 * Manifest Generator for Quranic Sciences Module
 * 
 * Scans the content folder and generates a structured manifest
 * for auto-discovery of lessons and sections.
 * 
 * Usage:
 *   npx ts-node scripts/generate-module-manifest.ts
 */

import fs from 'fs';
import path from 'path';

// Types
interface ManifestItem {
  id: string;
  title: string;
  type: 'pdf' | 'md' | 'mdx' | 'image';
  path: string;
  order: number;
  metadata?: {
    author?: string;
    duration?: number;
    tags?: string[];
  };
}

interface ManifestSection {
  id: string;
  title: string;
  order: number;
  items: ManifestItem[];
}

interface ModuleManifest {
  moduleId: 'ulum-al-quran';
  title: string;
  description: string;
  language: 'ar';
  direction: 'rtl';
  version: string;
  generatedAt: string;
  sections: ManifestSection[];
}

// Configuration
const CONTENT_ROOT = path.join(process.cwd(), 'public', 'content', 'ulum-al-quran');
const OUTPUT_PATH = path.join(
  process.cwd(),
  'public',
  'content',
  'ulum-al-quran',
  'manifest.generated.json'
);

const SUPPORTED_TYPES = {
  pdf: ['pdf'],
  md: ['md'],
  mdx: ['mdx'],
  image: ['png', 'jpg', 'jpeg', 'webp', 'gif'],
};

// Utility Functions
function getFileType(filename: string): ManifestItem['type'] | null {
  const ext = path.extname(filename).toLowerCase().slice(1);
  for (const [type, exts] of Object.entries(SUPPORTED_TYPES)) {
    if (exts.includes(ext)) {
      return type as ManifestItem['type'];
    }
  }
  return null;
}

function extractTitle(filename: string): string {
  // Remove extension
  let title = path.basename(filename, path.extname(filename));
  
  // Remove numeric prefixes (e.g., "01_", "02_")
  title = title.replace(/^\d+[\s_-]+/, '');
  
  // Replace underscores and hyphens with spaces
  title = title.replace(/[_-]/g, ' ');
  
  // Trim and capitalize
  title = title.trim();
  
  return title;
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .slice(0, 50);
}

function extractNumericPrefix(filename: string): number {
  const match = filename.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

function estimateReadingTime(filePath: string): number {
  try {
    const stats = fs.statSync(filePath);
    // Rough estimate: 200 words per minute
    // Assume ~5 bytes per word on average
    const words = stats.size / 5;
    return Math.ceil(words / 200);
  } catch {
    return 0;
  }
}

function scanDirectory(dirPath: string, baseDir: string): ManifestItem[] {
  const items: ManifestItem[] = [];
  let order = 0;

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // Filter and sort files
    const files = entries
      .filter(entry => entry.isFile())
      .sort((a, b) => {
        const prefixA = extractNumericPrefix(a.name);
        const prefixB = extractNumericPrefix(b.name);
        return prefixA - prefixB;
      });

    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      const fileType = getFileType(file.name);

      if (!fileType) {
        console.warn(`⚠️  Skipping unsupported file: ${file.name}`);
        continue;
      }

      const relativePath = path.relative(baseDir, filePath);
      const title = extractTitle(file.name);
      const id = generateId(title);

      const item: ManifestItem = {
        id,
        title,
        type: fileType,
        path: relativePath.replace(/\\/g, '/'), // Normalize to forward slashes
        order: order++,
        metadata: {
          duration: fileType === 'pdf' ? estimateReadingTime(filePath) : undefined,
          tags: [fileType],
        },
      };

      items.push(item);
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }

  return items;
}

function generateManifest(): ModuleManifest {
  const sections: ManifestSection[] = [];
  let sectionOrder = 0;

  try {
    // Check if content root exists
    if (!fs.existsSync(CONTENT_ROOT)) {
      console.error(`❌ Content root not found: ${CONTENT_ROOT}`);
      process.exit(1);
    }

    const entries = fs.readdirSync(CONTENT_ROOT, { withFileTypes: true });

    // Separate directories and root-level files
    const directories = entries.filter(e => e.isDirectory());
    const rootFiles = entries.filter(e => e.isFile());

    // Process directories as sections
    for (const dir of directories) {
      const sectionPath = path.join(CONTENT_ROOT, dir.name);
      const sectionTitle = extractTitle(dir.name);
      const sectionId = generateId(sectionTitle);

      const items = scanDirectory(sectionPath, CONTENT_ROOT);

      if (items.length > 0) {
        sections.push({
          id: sectionId,
          title: sectionTitle,
          order: sectionOrder++,
          items,
        });
      }
    }

    // Process root-level files as a default section
    if (rootFiles.length > 0) {
      const rootItems = rootFiles
        .filter(file => getFileType(file.name))
        .map((file, index) => {
          const filePath = path.join(CONTENT_ROOT, file.name);
          const fileType = getFileType(file.name)!;
          const title = extractTitle(file.name);
          const id = generateId(title);
          const relativePath = path.relative(CONTENT_ROOT, filePath);

          return {
            id,
            title,
            type: fileType,
            path: relativePath.replace(/\\/g, '/'),
            order: index,
            metadata: {
              duration: fileType === 'pdf' ? estimateReadingTime(filePath) : undefined,
              tags: [fileType],
            },
          };
        });

      if (rootItems.length > 0) {
        sections.push({
          id: 'root',
          title: 'الدروس الرئيسية',
          order: sectionOrder++,
          items: rootItems,
        });
      }
    }

    const manifest: ModuleManifest = {
      moduleId: 'ulum-al-quran',
      title: 'علوم القرآن',
      description: 'دراسة شاملة لعلوم القرآن الكريم - محاضرات وموارد تعليمية',
      language: 'ar',
      direction: 'rtl',
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      sections,
    };

    return manifest;
  } catch (error) {
    console.error('Error generating manifest:', error);
    process.exit(1);
  }
}

function writeManifest(manifest: ModuleManifest): void {
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write manifest
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
    console.log(`✅ Manifest generated successfully: ${OUTPUT_PATH}`);
    console.log(`   Sections: ${manifest.sections.length}`);
    console.log(
      `   Total items: ${manifest.sections.reduce((sum, s) => sum + s.items.length, 0)}`
    );
  } catch (error) {
    console.error('Error writing manifest:', error);
    process.exit(1);
  }
}

// Main
function main(): void {
  console.log('🔍 Scanning content directory...');
  console.log(`   Root: ${CONTENT_ROOT}`);

  const manifest = generateManifest();
  writeManifest(manifest);

  console.log('\n📋 Manifest structure:');
  manifest.sections.forEach(section => {
    console.log(`   📁 ${section.title} (${section.items.length} items)`);
    section.items.forEach(item => {
      console.log(`      📄 ${item.title} [${item.type}]`);
    });
  });
}

main();
