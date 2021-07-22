import { AwsGlossary } from "../glossaries/aws";
import { FrontendRoadmapGlossary } from "../glossaries/frontend-developer-roadmap";
import { TechRecruitmentGlossary } from "../glossaries/tech-recruitement";

export const usePublicGlossaries = () => {
  const allGlossaries = [
    AwsGlossary,
    FrontendRoadmapGlossary,
    TechRecruitmentGlossary,
  ];
  return [allGlossaries];
};
