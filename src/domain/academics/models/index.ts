/**
 * Academic Models - Central Export
 * جميع نماذج الهيكل الأكاديمي
 */

export { DegreeModel, createDegreeModel, isDegreeType } from './degree.model';

export {
  SpecialtyModel,
  createSpecialtyModel,
  isSpecialtyArea,
  getSpecialtyAreaNameAr,
} from './specialty.model';

export {
  ModuleModel,
  createModuleModel,
  isModuleType,
  getModuleTypeNameAr,
  getModuleTypeColor,
} from './module.model';
