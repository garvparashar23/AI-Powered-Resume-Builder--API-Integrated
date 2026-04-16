import ModernTemplate from './ModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';

export default function PreviewManager({ data }) {
  const TemplateMap = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    professional: ProfessionalTemplate
  };

  const ActiveTemplate = TemplateMap[data.templateId || 'modern'] || ModernTemplate;

  return (
    <div className="w-full h-full bg-white text-black font-sans origin-top overflow-hidden">
      <ActiveTemplate data={data} />
    </div>
  );
}
