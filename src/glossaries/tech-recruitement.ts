import { Glossary } from "../types";

const TechRecruitmentTag = {
  name: "tech-recruitment",
  color: "blue",
};

const DevopsTag = {
  name: "devops",
  color: "green",
};

const FrontendTag = {
  name: "frontend",
  color: "yellow",
};

const BackendTag = {
  name: "backend",
  color: "purple",
};

const DataTag = {
  name: "data",
  color: "orange",
};

const MobileTag = {
  name: "mobile",
  color: "red",
};

type CreateTermProps = {
  term: string;
  uuid: string;
};

const createVueJsTerm = ({ term, uuid }: CreateTermProps) => ({
  uuid,
  term,
  title: "Vue.js",
  description: `is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members. [Wikipedia]`,
  tags: [TechRecruitmentTag, FrontendTag],
});

const createJavaScriptTerm = ({ term, uuid }: CreateTermProps) => ({
  uuid,
  term,
  title: "JavaScript",
  description: `is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. [Wikipedia]`,
  tags: [TechRecruitmentTag, FrontendTag, BackendTag],
});

const createReactTerm = ({ term, uuid }: CreateTermProps) => ({
  uuid,
  term,
  title: "React",
  description: `is a free and open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. [Wikipedia]`,
  tags: [TechRecruitmentTag, FrontendTag],
});

const createWebpackTerm = ({ term, uuid }) => ({
  uuid,
  term,
  title: "Webpack",
  description: `is an open-source JavaScript module bundler. It is made primarily for JavaScript, but it can transform front-end assets such as HTML, CSS, and images if the corresponding loaders are included. webpack takes modules with dependencies and generates static assets representing those modules. [Wikipedia]`,
  tags: [TechRecruitmentTag, FrontendTag],
});

const createNodeJsTerm = ({ term, uuid }: CreateTermProps) => ({
  uuid,
  term,
  title: "Node.js",
  description: `is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. [Wikipedia]`,
  tags: [TechRecruitmentTag, BackendTag],
});

const createTypeScriptTerm = ({ term, uuid }: CreateTermProps) => ({
  uuid,
  term,
  title: "TypeScript",
  description: `is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript. [Wikipedia]`,
  tags: [TechRecruitmentTag, FrontendTag, BackendTag],
});

const createExpressTerm = ({ term, uuid }: CreateTermProps) => ({
  uuid,
  term,
  title: "Express",
  description: `is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js. [Wikipedia]`,
  tags: [TechRecruitmentTag, BackendTag],
});

const createInternationalizationAndLocalizationTerm = ({
  term,
  uuid,
  title,
}: CreateTermProps & { title: string }) => ({
  uuid,
  term,
  title,
  description: `internationalization and localization (American) or internationalisation and localisation (BrE), often abbreviated i18n and L10n,[1] are means of adapting computer software to different languages, regional peculiarities and technical requirements of a target locale.[2] Internationalization is the process of designing a software application so that it can be adapted to various languages and regions without engineering changes. Localization is the process of adapting internationalized software for a specific region or language by translating text and adding locale-specific components. [Wikipedia]`,
  tags: [TechRecruitmentTag, BackendTag],
});

const createPostgresTerm = ({ term, uuid }: CreateTermProps) => ({
  term,
  uuid,
  title: "PostgreSQL",
  description: `is a free and open-source relational database management system emphasizing extensibility and SQL compliance. It was originally named POSTGRES, referring to its origins as a successor to the Ingres database developed at the University of California, Berkeley. [Wikipedia]`,
  tags: [TechRecruitmentTag, BackendTag],
});

const createGcpTerm = ({ term, uuid }: CreateTermProps) => ({
  term,
  uuid,
  title: "Google Cloud Platform",
  description: `offered by Google, is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, file storage, and YouTube [Wikipedia]. It is similar to Amazon Web Services or Microsoft Azure.`,
  tags: [TechRecruitmentTag, DevopsTag],
});

const createLessTerm = ({ term, uuid }: CreateTermProps) => ({
  term,
  uuid,
  title: "Less",
  description: `is a dynamic preprocessor style sheet language that can be compiled into Cascading Style Sheets and run on the client side or server side. Designed by Alexis Sellier, Less is influenced by Sass and has influenced the newer "SCSS" syntax of Sass, which adapted its CSS-like block formatting syntax. [Wikipedia]`,
  tags: [TechRecruitmentTag, FrontendTag],
});

const createRubyOnRailsTerm = ({ term, uuid }: CreateTermProps) => ({
  term,
  uuid,
  title: "Ruby on Rails",
  description: `is a server-side web application framework written in Ruby under the MIT License. Rails is a model–view–controller framework, providing default structures for a database, a web service, and web pages. [Wikipedia]`,
  tags: [TechRecruitmentTag, BackendTag],
});

const createGoTerm = ({ term, uuid }: CreateTermProps) => ({
  term,
  uuid,
  title: "Go",
  description: `is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Go is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency. [Wikipedia]`,
  tags: [TechRecruitmentTag, BackendTag],
});

export const TechRecruitmentGlossary: Glossary = {
  uuid: "eebe8301-44c6-4c3e-8fda-92b180bd8b82",
  description: "...",
  title: "Tech Recruitment",
  terms: [
    createVueJsTerm({
      term: "Vue.js",
      uuid: "5d59bd72-ae2b-4f74-bfea-9418c089ecb2",
    }),
    createVueJsTerm({
      term: "Vue",
      uuid: "5d59bd72-ae2b-4f74-bfea-9418c089ecb2",
    }),
    createJavaScriptTerm({
      uuid: "6f2fee28-8956-47c7-9b00-c6a705279365",
      term: "JavaScript",
    }),
    createJavaScriptTerm({
      uuid: "0620c8ad-c63a-4292-af7a-ef76a3346a43",
      term: "JS",
    }),
    {
      uuid: "32289afe-ef53-4868-aac9-8f2cc0e503b6",
      term: "ES6",
      title: "ECMAScript 2015",
      description: `is a new version of the standard that JavaScript is based on. It was released in 2015 and most modern JavaScript features are based on this standard.`,
      tags: [TechRecruitmentTag, FrontendTag, BackendTag],
    },
    {
      uuid: "86074ae7-81f8-4cec-ab0f-9e4fec93fe00",
      term: ".NET",
      title: ".NET (Dotnet)",
      description: `is a free and open-source, managed computer software framework for Windows, Linux, and macOS operating systems. It is a cross-platform successor to .NET Framework. The project is primarily developed by Microsoft employees by way of the .NET Foundation, and released under the MIT License. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "db181d6d-91f8-426b-b994-1f070c73094a",
      term: "Java",
      title: "Java",
      description: `is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "90827848-3fcc-4149-b112-34359054e5ec",
      term: "Haskell",
      title: "Haskell",
      description: `is a general-purpose, statically typed, purely functional programming language with type inference and lazy evaluation. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    createReactTerm({
      uuid: "1e568351-b863-4e51-a672-b974f64ae75a",
      term: "React",
    }),
    createReactTerm({
      uuid: "e3ffe83e-203c-48f6-b206-660f784ae5c7",
      term: "React.js",
    }),
    createReactTerm({
      uuid: "17d5702a-10d3-4c1a-bf97-cebda9135500",
      term: "ReactJS",
    }),
    {
      uuid: "63f6f77e-cdb0-493c-be59-8b4db233552c",
      term: "Angular",
      title: "Angular",
      description: `is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    createWebpackTerm({
      uuid: "60dce2d7-e111-46e0-a58a-84d440469ef4",
      term: "Webpack",
    }),
    createWebpackTerm({
      uuid: "716396b2-298a-46d1-90cc-14f5db664e77",
      term: "webpack",
    }),
    createNodeJsTerm({
      uuid: "d811e2f9-1ca5-4923-983c-830b398f1de0",
      term: "Node.js",
    }),
    createNodeJsTerm({
      uuid: "813cb4aa-ac6f-40e4-a061-1b212b5d6289",
      term: "NodeJS",
    }),
    createTypeScriptTerm({
      uuid: "caf4ba90-3263-4158-8edf-b1c7dad50677",
      term: "TypeScript",
    }),
    createTypeScriptTerm({
      uuid: "caf4ba90-3263-4158-8edf-b1c7dad50677",
      term: "TS",
    }),
    createExpressTerm({
      uuid: "f71ea7e6-51fe-424c-8cdb-2bb2be5aa06c",
      term: "Express",
    }),
    createExpressTerm({
      uuid: "fa66c60b-9a72-42bf-96a9-5dea6f1991c4",
      term: "Express.js",
    }),
    {
      uuid: "39b76793-e094-493b-bbf6-63dbfb94e407",
      term: "Babel",
      title: "Babel",
      description: `is a free and open-source JavaScript transcompiler that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript that can be run by older JavaScript engines. Babel is a popular tool for using the newest features of the JavaScript programming language. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "d87eb58e-961e-4687-b8dd-9a65c3fe1f52",
      term: "Kafka",
      title: "Apache Kafka",
      description: `is a framework implementation of a software bus using stream-processing. It is an open-source software platform developed by the Apache Software Foundation written in Scala and Java. The project aims to provide a unified, high-throughput, low-latency platform for handling real-time data feeds. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "3ffa636f-104b-445d-a8dc-3a3aa00a26b6",
      term: "Puppeteer",
      title: "Puppeteer",
      description: `is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "059d7bd9-aca3-4e63-baa7-6d3e0505f6ee",
      term: "Jest",
      title: "Jest",
      description: `is a JavaScript testing framework maintained by Facebook, Inc. designed and built by Christoph Nakazawa with a focus on simplicity and support for large web applications. It works with projects using Babel, TypeScript, Node.js, React, Angular, Vue.js and Svelte. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag, BackendTag],
    },
    {
      uuid: "67c2b55d-5cd9-4d2a-8025-aa6689727f1b",
      term: "Docker",
      title: "Docker",
      description: `is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag, BackendTag],
    },
    createInternationalizationAndLocalizationTerm({
      uuid: "a69f7b7a-98a5-4af1-b2ad-2765ae8e9c00",
      term: "i18n",
      title: "Internationalization",
    }),
    createInternationalizationAndLocalizationTerm({
      uuid: "c1c4445f-c1c6-4663-a3eb-e05fb7d62465",
      term: "L10n",
      title: "Localization",
    }),
    {
      uuid: "8be7b9ab-91ff-4428-8c63-f880f0b970bd",
      term: "UI",
      title: "User interface",
      description: `In the industrial design field of human–computer interaction, a user interface is the space where interactions between humans and machines occur. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "3f8eb78c-5ec0-48ca-beb5-196d6e8a1a3b",
      term: "UX",
      title: "User experience",
      description: `The user experience is how a user interacts with and experiences a product, system or service. It includes a person's perceptions of utility, ease of use, and efficiency. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "ed515c42-ce67-48f1-a0a7-78d59bbd6029",
      term: "Python",
      title: "Python",
      description: `is an interpreted high-level general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant indentation. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "387faf72-1d0a-472e-819f-acc94cd741c1",
      term: "Flask",
      title: "Flask",
      description: `is a micro web framework written in Python. It is classified as a microframework because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "b0acf1e2-6e3e-45b7-a372-3cb285b39ba6",
      term: "FastAPI",
      title: "FastAPI",
      description: `is a contemporary (high-performance) web framework for creating APIs in Python 3.6+ using standard Python type hints.`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "4cfe35b9-1aca-442e-b8e1-b9ae7e6a88c8",
      term: "Terraform",
      title: "Terraform",
      description: `is an open-source infrastructure as code software tool created by HashiCorp. Users define and provide data center infrastructure using a declarative configuration language known as HashiCorp Configuration Language, or optionally JSON. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag, BackendTag],
    },
    {
      uuid: "c49126b1-3373-479e-b556-03e88e33e0cc",
      term: "Ansible",
      title: "Ansible",
      description: `is an open-source software provisioning, configuration management, and application-deployment tool enabling infrastructure as code. It runs on many Unix-like systems, and can configure both Unix-like systems as well as Microsoft Windows. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag, BackendTag],
    },
    {
      uuid: "a87f8895-9053-443a-892e-c88bc2fcbb70",
      term: "Kubernetes",
      title: "Kubernetes",
      description: `is an open-source container-orchestration system for automating computer application deployment, scaling, and management. It was originally designed by Google and is now maintained by the Cloud Native Computing Foundation. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag, BackendTag],
    },
    createGcpTerm({
      uuid: "bb071b54-ca86-46cc-9219-cd997fdac486",
      term: "GCP",
    }),
    createGcpTerm({
      uuid: "d3ec4526-b710-4732-857e-d8fc00d0c840",
      term: "Google Cloud Platform",
    }),
    {
      uuid: "daa1c6f2-4b34-46b4-92cd-3f5554873a39",
      term: "AWS",
      title: "Amazon Web Services",
      description: `is a subsidiary of Amazon providing on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered pay-as-you-go basis [Wikipedia]. It is similar to Google Cloud Platform or Microsoft Azure.`,
      tags: [TechRecruitmentTag, DevopsTag],
    },
    {
      uuid: "c3b88847-127f-4911-960b-30be721b8f2c",
      term: "Azure",
      title: "Microsoft Azure",
      description: `is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers [Wikipedia]. It is similar to Google Cloud Platform or Amazon Web Services.`,
      tags: [TechRecruitmentTag, DevopsTag],
    },
    {
      uuid: "cd3d22fd-a54a-4483-8530-e0988ddf4e34",
      term: "CDN",
      title: "Content delivery network",
      description: `is a geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing the service spatially relative to end users. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag, FrontendTag],
    },
    {
      uuid: "fa3ea333-695b-4efe-ade2-4cddfaa3a3d2",
      term: "MongoDB",
      title: "MongoDB",
      description: `is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    createPostgresTerm({
      uuid: "4d08da56-46f5-4948-8cc8-140413cb3137",
      term: "PostgreSQL",
    }),
    createPostgresTerm({
      uuid: "82d7bca3-469e-4266-baac-35cd34ef964a",
      term: "Postgres",
    }),
    {
      uuid: "f5f6c432-2843-4475-8c16-4c85000eb0ee",
      term: "MySQL",
      title: "MySQL",
      description: `is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "49f6791a-4b3f-45ba-8232-81cf080a7296",
      term: "SQL Server",
      title: "Microsoft SQL Server",
      description: `is a relational database management system developed by Microsoft. As a database server, it is a software product with the primary function of storing and retrieving data as requested by other software applications—which may run either on the same computer or on another computer across a network. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "8f452cfe-5226-44db-8174-57a78ab7144e",
      term: "Redis",
      title: "Redis",
      description: `is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability. Redis supports different kinds of abstract data structures, such as strings, lists, maps, sets, sorted sets, HyperLogLogs, bitmaps, streams, and spatial indices. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "156ffd39-5991-478b-b7f3-8d52b0493116",
      term: "ElasticSearch",
      title: "ElasticSearch",
      description: `is a search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "ce8b1173-c19d-42f1-8512-b832b7b32518",
      term: "Grafana",
      title: "Grafana",
      description: `is a multi-platform open source analytics and interactive visualization web application. It provides charts, graphs, and alerts for the web when connected to supported data sources. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag],
    },
    {
      uuid: "c4595871-af92-40b4-96d0-06b1c0ca875f",
      term: "HTML",
      title: "HyperText Markup Language",
      description: `is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "8f96e38f-8f55-4bff-95ab-afbbaa23cf0b",
      term: "CSS",
      title: "Cascading Style Sheets",
      description: `is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "ea9cd5da-a515-45ff-8132-5f31c5c0d7eb",
      term: "CI",
      title: "Continuous integration",
      description: `is the practice of merging all developers' working copies to a shared mainline several times a day. Grady Booch first proposed the term CI in his 1991 method, although he did not advocate integrating several times a day. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag],
    },
    {
      uuid: "1ee8c333-ae93-4ccf-b9e3-773681459640",
      term: "CD",
      title: "Continuous delivery",
      description: `is a software engineering approach in which teams produce software in short cycles, ensuring that the software can be reliably released at any time and, when releasing the software, without doing so manually. It aims at building, testing, and releasing software with greater speed and frequency. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag],
    },
    {
      uuid: "b7e8c2d0-c405-4e9a-b525-8273b4b29c60",
      term: "BFF",
      title: "Backend for Frontend",
      description: `is an architecture part that engineers use to coordinate requests to subsequent services. It is mostly used by engineers that glue the frontend together with the backend.`,
      tags: [TechRecruitmentTag, BackendTag, FrontendTag],
    },
    {
      uuid: "5b6c5220-cdd6-41c4-9f07-bd422f31c2a8",
      term: "git",
      title: "Git",
      description: `is software for tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development. Its goals include speed, data integrity, and support for distributed, non-linear workflows. [Wikipedia]`,
      tags: [TechRecruitmentTag],
    },
    {
      uuid: "65deba71-8d62-4bdd-834a-ed150a6412fa",
      term: "Prometheus",
      title: "Prometheus",
      description: `is a free software application used for event monitoring and alerting. It records real-time metrics in a time series database built using a HTTP pull model, with flexible queries and real-time alerting. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "35e317e2-7d21-464b-b553-58a84dbea755",
      term: "Redux",
      title: "Redux",
      description: `is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebook's Flux architecture, it was created by Dan Abramov and Andrew Clark. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "d65c2fbf-c475-41bf-bc5e-f9e4fa1a641b",
      term: "CSS-in-JS",
      title: "CSS-in-JS",
      description: `is a styling technique where JavaScript is used to style components. When this JavaScript is parsed, CSS is generated and attached into the DOM. It allows to abstract CSS to the component level itself, using JavaScript to describe styles in a declarative and maintainable way. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "b622bdbf-c0bb-44ee-ab1c-bdb506e92984",
      term: "REST",
      title: "Representational state transfer",
      description: `is a software architectural style that was created to guide the design and development of the architecture for the World Wide Web. REST defines a set of constraints for how the architecture of an Internet-scale distributed hypermedia system, such as the Web, should behave. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "19a0c473-7c40-479e-82aa-a23d89189efb",
      term: "SPA",
      title: "Single-page application",
      description: `is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of a web browser loading entire new pages. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "a2f0db6e-be59-4418-ac27-de19fdd2e68a",
      term: "WebAssembly",
      title: "WebAssembly",
      description: `is an open standard that defines a portable binary-code format for executable programs, and a corresponding textual assembly language, as well as interfaces for facilitating interactions between such programs and their host environment. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "b6869116-2d66-4349-ad9f-7c1d3eccfb97",
      term: "WebGL",
      title: "Web Graphics Library",
      description: `is a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins. WebGL is fully integrated with other web standards, allowing GPU-accelerated usage of physics and image processing and effects as part of the web page canvas. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "15b2bec3-1af6-4311-8a91-0d15c097b6cc",
      term: "SQL",
      title: "Structured Query Language",
      description: `is a domain-specific language used in programming and designed for managing data held in a relational database management system, or for stream processing in a relational data stream management system. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "0aa3b154-a260-43bb-abec-a73381ccfef5",
      term: "NoSQL",
      title: "non-relational Structured Query Language",
      description: `is a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases. Such databases have existed since the late 1960s, but the name "NoSQL" was only coined in the early 21st century, triggered by the needs of Web 2.0 companies. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "990c49f4-c524-4347-9639-66529b48f5ef",
      term: "GraphQL",
      title: "Graph Query Language",
      description: `is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag, FrontendTag],
    },
    {
      uuid: "0e3b4d4b-cf0c-4adb-86b2-593907a0320e",
      term: "Pandas",
      title: "Pandas",
      description: `is a software library written for the Python programming language for data manipulation and analysis. In particular, it offers data structures and operations for manipulating numerical tables and time series. It is free software released under the three-clause BSD license. [Wikipedia]`,
      tags: [TechRecruitmentTag, DataTag],
    },
    {
      uuid: "90f9a761-d81c-462e-a3b0-17710cc90eb0",
      term: "NumPy",
      title: "NumPy",
      description: `is a library for the Python programming language, adding support for large, multi-dimensional arrays and matrices, along with a large collection of high-level mathematical functions to operate on these arrays. [Wikipedia]`,
      tags: [TechRecruitmentTag, DataTag],
    },
    {
      uuid: "9b582a35-77f3-424b-bffc-1f2f393ef872",
      term: "Matplotlib",
      title: "Matplotlib",
      description: `is a plotting library for the Python programming language and its numerical mathematics extension NumPy. It provides an object-oriented API for embedding plots into applications using general-purpose GUI toolkits like Tkinter, wxPython, Qt, or GTK. [Wikipedia]`,
      tags: [TechRecruitmentTag, DataTag],
    },
    {
      uuid: "c1a58025-06b8-43d3-a476-7beb725b649e",
      term: "DevOps",
      title: "DevOps",
      description: `is a set of practices that combines software development and IT operations. It aims to shorten the systems development life cycle and provide continuous delivery with high software quality. DevOps is complementary with Agile software development; several DevOps aspects came from the Agile methodology. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag],
    },
    {
      uuid: "3052a722-776d-4a30-b04b-cf0ef7d8107c",
      term: "MDN",
      title: "Mozilla Developer Network",
      description: `is a documentation repository and learning resource for web developers used by Mozilla, Microsoft, Google, and Samsung. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "3d3c7ba6-b70b-4998-bb33-f8077e4207ae",
      term: "AST",
      title: "Abstract syntax tree",
      description: `is a tree representation of the abstract syntactic structure of source code written in a programming language. Each node of the tree denotes a construct occurring in the source code. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag, BackendTag],
    },
    {
      uuid: "6c08c40f-f62f-498c-a373-b216f9e8fbec",
      term: "TDD",
      title: "Test-driven development",
      description: `is a software development process relying on software requirements being converted to test cases before software is fully developed, and tracking all software development by repeatedly testing the software against all test cases. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag, BackendTag],
    },
    {
      uuid: "26aea6bb-fef1-4394-9572-22c8866d4348",
      term: "NPM",
      title: "Node Package Manager",
      description: `is a package manager for the JavaScript programming language maintained by npm, Inc. npm is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "02dca083-4863-4f4f-981d-df0617c4ede7",
      term: "styled-components",
      title: "styled-components",
      description: `a styling library for the frontend framework React. It embodies the general functionality of CSS-in-JS.`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "68967d40-fa3a-4105-8c0b-edd496f62ce2",
      term: "emotion",
      title: "emotion",
      description: `is a performant and flexible CSS-in-JS library. Building on many other CSS-in-JS libraries, it allows you to style apps quickly with string or object styles. It has predictable composition to avoid specificity issues with CSS. With source maps and labels, Emotion has a great developer experience and great performance with heavy caching in production. [Readme of emotion]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "8f833905-a329-4b2b-8631-c5e2087f5030",
      term: "WCAG",
      title: "Web Content Accessibility Guidelines",
      description: `is developed through the W3C process in cooperation with individuals and organizations around the world, with a goal of providing a single shared standard for web content accessibility that meets the needs of individuals, organizations, and governments internationally. [w3.org]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "dd4acd55-b318-45ab-bf13-697632842b0c",
      term: "JWT",
      title: "JSON Web Token",
      description: `is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "d91270bf-083b-427f-a24d-1b2088bf5001",
      term: "QA",
      title: "Quality Assurance",
      description: `is a way of preventing mistakes and defects in manufactured products and avoiding problems when delivering products or services to customers; which ISO 9000 defines as "part of quality management focused on providing confidence that quality requirements will be fulfilled". [Wikipedia]`,
      tags: [TechRecruitmentTag],
    },
    {
      uuid: "66e914f8-ebd0-4566-a75c-89a398237448",
      term: "C++",
      title: "C++",
      description: `is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes". [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "a767bfc7-cb99-467a-a260-df80f07cda88",
      term: "C#",
      title: "C#",
      description: `is a general-purpose, multi-paradigm programming language encompassing static typing, strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented, and component-oriented programming disciplines. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "4fe33d65-19e8-49e4-87d7-1492f195f092",
      term: "Cosmos DB",
      title: "Azure Cosmos DB",
      description: `is Microsoft's proprietary globally-distributed, multi-model database service "for managing data at planet-scale" launched in May 2017. It is schema-agnostic, horizontally scalable, and generally classified as a NoSQL database. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "34674cab-7dd6-45d5-b205-e219ec88e204",
      term: "DynamoDB",
      title: "Amazon Dynamo Database",
      description: `is a fully managed proprietary NoSQL database service that supports key–value and document data structures and is offered by Amazon.com as part of the Amazon Web Services portfolio. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "1c7d75de-b661-4783-a240-1b1fe1a8ee5c",
      term: "Spring",
      title: "Spring Framework",
      description: `is an application framework and inversion of control container for the Java platform. The framework's core features can be used by any Java application, but there are extensions for building web applications on top of the Java EE platform. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "54fcd83e-f07d-4126-9bfa-2a5c0f1b21f3",
      term: "JavaFX",
      title: "JavaFX",
      description: `is a software platform for creating and delivering desktop applications, as well as rich web applications that can run across a wide variety of devices. JavaFX has support for desktop computers and web browsers on Microsoft Windows, Linux, and macOS, as well as mobile devices running iOS and Android. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "95609dbc-467a-45cb-a137-d9e86e5b4322",
      term: "Next.js",
      title: "Next.js",
      description: `is an open-source development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static websites. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "de9c3576-9b0f-4eb9-876c-13f6dc5388d4",
      term: "React Native",
      title: "React Native",
      description: `is an open-source mobile application framework created by Facebook, Inc. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by enabling developers to use React's framework along with native platform capabilities. [Wikipedia]`,
      tags: [TechRecruitmentTag, MobileTag],
    },
    {
      uuid: "6514de9b-5361-4756-b9f9-517fd82f430a",
      term: "API",
      title: "Application programming interface",
      description: `is a connection between computers or between computer programs. It is a type of software interface, offering a service to other pieces of software. A document or standard that describes how to build such a connection or interface is called an API specification. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    createLessTerm({
      uuid: "9bd2fa01-74b7-4b95-992c-b21f28f46969",
      term: "Less",
    }),
    createLessTerm({
      uuid: "6c5f6319-58d5-408d-9c26-918915678fda",
      term: "LESS",
    }),
    {
      uuid: "8e7c8ef6-4681-46fe-a536-6381f738b63a",
      term: "Sass",
      title: "Sass",
      description: `is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. SassScript is the scripting language itself. Sass consists of two syntaxes. The original syntax, called "the indented syntax," uses a syntax similar to Haml. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "34402e19-b06a-46b2-810b-6525e05f3ee0",
      term: "SaaS",
      title: "Software as a service",
      description: `is a software licensing and delivery model in which software is licensed on a subscription basis and is centrally hosted. It is sometimes referred to as "on-demand software", and was formerly referred to as "software plus services" by Microsoft. [Wikipedia]`,
      tags: [TechRecruitmentTag],
    },
    {
      uuid: "f04241fa-3721-44f0-8573-a1e755f303b3",
      term: "Scrum",
      title: "Scrum",
      description: `is a framework utilizing an agile mindset for developing, delivering, and sustaining products in a complex environment, with an initial emphasis on software development, although it has been used in other fields including research, sales, marketing and advanced technologies. [Wikipedia]`,
      tags: [TechRecruitmentTag],
    },
    {
      uuid: "4b695187-c40a-4798-8493-926f2d48cfbb",
      term: "Ruby",
      title: "Ruby",
      description: `is an interpreted, high-level, general-purpose programming language. It was designed and developed in the mid-1990s by Yukihiro "Matz" Matsumoto in Japan. Ruby is dynamically typed and uses garbage collection and just-in-time compilation. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    createRubyOnRailsTerm({
      uuid: "633f626f-9764-4b85-ba8b-6f96a3a13de8",
      term: "Ruby on Rails",
    }),
    createRubyOnRailsTerm({
      uuid: "c71ed171-4682-42f0-a62d-fb039dbf4574",
      term: "Rails",
    }),
    {
      uuid: "489549e3-8cfd-4d10-882a-534b06b289e4",
      term: "Sentry",
      title: "Sentry",
      description: `is an open-source error tracking system that allows programmers to track and repair problems in real time.`,
      tags: [TechRecruitmentTag],
    },
    {
      uuid: "a93db176-1cf9-4e3b-a260-a20583144663",
      term: "GitHub",
      title: "GitHub",
      description: `is a provider of Internet hosting for software development and version control using Git. It offers the distributed version control and source code management functionality of Git, plus its own features. [Wikipedia]`,
      tags: [TechRecruitmentTag],
    },
    {
      uuid: "a93db176-1cf9-4e3b-a260-a20583144663",
      term: "Travis",
      title: "Travis",
      description: `is a hosted continuous integration service used to build and test software projects hosted on GitHub and Bitbucket. Travis CI was the first CI service which provided services to open-source projects for free and continues to do so. [Wikipedia]`,
      tags: [TechRecruitmentTag, DevopsTag],
    },
    {
      uuid: "5718a4a5-779d-4b0c-9341-ecc02203deec",
      term: "Go",
      title: "Go",
      description: `is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Go is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    createGoTerm({
      uuid: "5718a4a5-779d-4b0c-9341-ecc02203deec",
      term: "Go",
    }),
    createGoTerm({
      uuid: "a4eaefa0-1f4b-4c1c-b4fd-3eb4e648bffc",
      term: "Golang",
    }),
    {
      uuid: "55e6d266-453d-4409-ba68-417ef5c7c8be",
      term: "Rust",
      title: "Rust",
      description: `is a multi-paradigm, high-level, general-purpose programming language designed for performance and safety, especially safe concurrency. Rust is syntactically similar to C++, but can guarantee memory safety by using a borrow checker to validate references. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "6452d1f8-9a78-4e4d-8b79-de08b9ffa34b",
      term: "Nuxt.js",
      title: "Nuxt.js",
      description: `is a free and open source web application framework based on Vue.js, Node.js, Webpack and Babel.js. Nuxt is inspired by Next.js, which is a framework of similar purpose, based on React.js. The framework is advertised as a "meta-framework for universal applications". [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag],
    },
    {
      uuid: "0a84aae0-0333-41a8-a2a7-42f3bf36c071",
      term: "PHP",
      title: "PHP: Hypertext Preprocessor",
      description: `is a general-purpose scripting language geared towards web development. It was originally created by Danish-Canadian programmer Rasmus Lerdorf in 1994. The PHP reference implementation is now produced by The PHP Group. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "349f25c0-c4af-4420-a429-5b413390f45c",
      term: "Django",
      title: "Django",
      description: `is a Python-based free and open-source web framework that follows the model–template–views architectural pattern. It is maintained by the Django Software Foundation, an American independent organization established as a 501 non-profit. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "fd835cc9-6c1a-4180-8e06-14d3634123f2",
      term: "Laravel",
      title: "Laravel",
      description: `is a free, open-source PHP web framework, created by Taylor Otwell and intended for the development of web applications following the model–view–controller architectural pattern and based on Symfony. [Wikipedia]`,
      tags: [TechRecruitmentTag, BackendTag],
    },
    {
      uuid: "132c1a62-bfb4-4180-9a70-5840ca13ab80",
      term: "JSON",
      title: "JSON",
      description: `is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays. [Wikipedia]`,
      tags: [TechRecruitmentTag, FrontendTag, BackendTag],
    },
  ],
};
