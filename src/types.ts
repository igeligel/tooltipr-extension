export type Dictionary = Record<
  string,
  { replacer: string; title: string; description: string; tags: Array<string> }
>;

export type Glossary = {
  title: string;
  uuid: string;
  description: string;
  terms: Array<{
    uuid: string;
    term: string;
    title: string;
    description: string;
    tags: Array<{
      name: string;
      color: string;
    }>;
  }>;
};
