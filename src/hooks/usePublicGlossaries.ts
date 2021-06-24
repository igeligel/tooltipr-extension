import { AwsGlossary } from "../glossaries/aws";
import { FrontendRoadmapGlossary } from "../glossaries/frontend-developer-roadmap";

export const usePublicGlossaries = () => {
  const allGlossaries = [AwsGlossary, FrontendRoadmapGlossary];
  return [allGlossaries];
};
