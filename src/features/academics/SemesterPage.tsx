import { useParams, Navigate } from 'react-router-dom';

export default function SemesterPage() {
  const { degreeId, specialtyId, yearId } = useParams();
  
  // في هذه المرحلة، نقوم بالتوجيه التلقائي لصفحة السنة لأنها تعرض السداسيات بالفعل
  return <Navigate to={`/academics/${degreeId}/${specialtyId}/${yearId}`} replace />;
}
