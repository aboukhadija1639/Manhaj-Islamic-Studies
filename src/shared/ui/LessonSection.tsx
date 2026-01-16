import { Card } from './Card';
import { cn } from '../utils/cn';
import type { LessonSection as LessonSectionType } from '../data/englishLessons';

interface LessonSectionProps {
  section: LessonSectionType;
  className?: string;
}

const LessonSection = ({ section, className }: LessonSectionProps) => {
  const renderContent = () => {
    switch (section.type) {
      case 'theory':
        return (
          <Card className={cn('p-6', className)}>
            {section.title && (
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {section.title}
              </h3>
            )}
            {section.content && (
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: section.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>')
                    .replace(/- (.+)/g, '<li>$1</li>')
                    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside mb-4 space-y-2">$1</ul>'),
                }}
              />
            )}
          </Card>
        );

      case 'table':
        return (
          <Card className={cn('p-6 overflow-x-auto', className)}>
            {section.title && (
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {section.title}
              </h3>
            )}
            {section.data && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-100 dark:bg-primary-900/30">
                      {section.data.headers.map((header: string, idx: number) => (
                        <th
                          key={idx}
                          className="border-2 border-border px-4 py-3 text-left font-bold text-foreground"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.data.rows.map((row: string[], rowIdx: number) => (
                      <tr
                        key={rowIdx}
                        className="hover:bg-background dark:hover:bg-muted transition-colors"
                      >
                        {row.map((cell: string, cellIdx: number) => (
                          <td
                            key={cellIdx}
                            className="border-2 border-border px-4 py-3 text-card-foreground"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        );

      case 'example':
        return (
          <Card className={cn('p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800', className)}>
            <div className="flex items-start gap-4">
              {section.icon && (
                <span className="text-4xl flex-shrink-0">{section.icon}</span>
              )}
              <div className="flex-1">
                {section.title && (
                  <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                    {section.title}
                  </h3>
                )}
                {section.data?.examples && (
                  <div className="space-y-4">
                    {section.data.examples.map((example: any, idx: number) => (
                      <div key={idx} className="p-4 bg-card rounded-lg border border-blue-200 dark:border-blue-700">
                        {example.text && (
                          <p className="text-card-foreground font-medium mb-2">
                            {example.text}
                          </p>
                        )}
                        {example.number && example.text && (
                          <p className="text-card-foreground">
                            <span className="font-bold">{example.number}</span> is <span className="font-bold text-blue-600 dark:text-blue-400">{example.text}</span>
                          </p>
                        )}
                        {example.note && (
                          <p className="text-sm text-muted-foreground italic mt-1">
                            {example.note}
                          </p>
                        )}
                        {example.structure && (
                          <p className="text-sm text-blue-700 dark:text-blue-300 mt-2 font-semibold">
                            Structure: {example.structure}
                          </p>
                        )}
                        {example.direct && (
                          <div className="space-y-2">
                            <p className="text-card-foreground">
                              <span className="font-semibold text-green-600 dark:text-green-400">Direct:</span> {example.direct}
                            </p>
                            <p className="text-card-foreground">
                              <span className="font-semibold text-blue-600 dark:text-blue-400">Indirect:</span>{' '}
                              <span dangerouslySetInnerHTML={{ __html: example.indirect.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600 dark:text-blue-400">$1</strong>') }} />
                            </p>
                          </div>
                        )}
                        {example.active && (
                          <div className="space-y-2">
                            <p className="text-card-foreground">
                              <span className="font-semibold text-green-600 dark:text-green-400">Active:</span> {example.active}
                            </p>
                            <p className="text-card-foreground">
                              <span className="font-semibold text-purple-600 dark:text-purple-400">Passive:</span> {example.passive}
                            </p>
                          </div>
                        )}
                        {example.step && (
                          <div>
                            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
                              {example.step}
                            </p>
                            <p
                              className="text-card-foreground"
                              dangerouslySetInnerHTML={{
                                __html: example.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600 dark:text-blue-400">$1</strong>'),
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        );

      case 'tip':
        return (
          <Card className={cn('p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800', className)}>
            <div className="flex items-start gap-4">
              {section.icon && (
                <span className="text-3xl flex-shrink-0">{section.icon}</span>
              )}
              <div className="flex-1">
                {section.title && (
                  <h4 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                    {section.title}
                  </h4>
                )}
                {section.content && (
                  <p
                    className="text-card-foreground"
                    dangerouslySetInnerHTML={{
                      __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                )}
              </div>
            </div>
          </Card>
        );

      case 'steps':
        return (
          <Card className={cn('p-6', className)}>
            {section.title && (
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {section.title}
              </h3>
            )}
            {section.data?.steps && (
              <ol className="space-y-4">
                {section.data.steps.map((step: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <p
                      className="flex-1 text-card-foreground pt-1"
                      dangerouslySetInnerHTML={{
                        __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-600 dark:text-primary-400">$1</strong>'),
                      }}
                    />
                  </li>
                ))}
              </ol>
            )}
          </Card>
        );

      case 'practice':
        return (
          <Card className={cn('p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800', className)}>
            {section.title && (
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
                {section.title}
              </h3>
            )}
            {section.content && (
              <p className="text-card-foreground">{section.content}</p>
            )}
          </Card>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

export default LessonSection;
