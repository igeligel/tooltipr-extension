type Glossary = {
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

export const AwsGlossary: Glossary = {
  uuid: "9d0ab3a6-678a-4138-b0a2-8fd1d37a242c",
  description: "wadadwwad",
  title: "AWS",
  terms: [
    {
      uuid: "c5ef8314-8bb2-4804-9c09-9a66229eeb56",
      term: "EC2",
      title: "Amazon Elastic Compute Cloud",
      description: `is a part of Amazon.com's cloud-computing platform, Amazon Web Services, that allows users to rent virtual computers on which to run their own computer applications. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "5c089f39-f180-450c-a9e0-317bca92be75",
      term: "S3",
      title: "Amazon S3",
      description: `Amazon S3 or Amazon Simple Storage Service is a service offered by Amazon Web Services that provides object storage through a web service interface. Amazon S3 uses the same scalable storage infrastructure that Amazon.com uses to run its global e-commerce network. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "5768bf07-10f2-48c1-ac45-0bc3e966b65f",
      term: "AWS Lambda",
      title: "AWS Lambda",
      description: `is an event-driven, serverless computing platform provided by Amazon as a part of Amazon Web Services. It is a computing service that runs code in response to events and automatically manages the computing resources required by that code. It was introduced in November 2014. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "85a14b4f-eab0-4ef7-af23-414a5c317331",
      term: "SQS",
      title: "Amazon Simple Queue Service",
      description: `is a distributed message queuing service introduced by Amazon.com in late 2004. It supports programmatic sending of messages via web service applications as a way to communicate over the Internet. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "4c87f967-fe7f-4bc4-9389-7ce127e2518a",
      term: "Amazon Glacier",
      title: "Amazon Glacier",
      description: `is an online file storage web service that provides storage for data archiving and backup. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "db9eadf6-ffda-4470-beda-7db8d9807b97",
      term: "CloudFront",
      title: "Amazon CloudFront",
      description: `is a content delivery network (CDN) operated by Amazon Web Services. Content delivery networks provide a globally-distributed network of proxy servers that cache content, such as web videos or other bulky media, more locally to consumers, thus improving access speed for downloading the content. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "d494caf9-bc93-4738-886a-409d521209b8",
      term: "VPC",
      title: "Amazon Virtual Private Cloud",
      description: `is a commercial cloud computing service that provides users a virtual private cloud, by "provision[ing] a logically isolated section of Amazon Web Services (AWS) Cloud". [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "27fd2c4f-4c16-4e64-83e5-44b8e52c9017",
      term: "Beanstalk",
      title: "Amazon Elastic Beanstalk",
      description: `is an orchestration service offered by Amazon Web Services for deploying applications which orchestrates various AWS services, including EC2, S3, Simple Notification Service (SNS), CloudWatch, autoscaling, and Elastic Load Balancers. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "c4da4ae0-9b32-45f2-b180-eb4ee476e298",
      term: "DynamoDB",
      title: "Amazon Elastic Beanstalk",
      description: `is a fully managed proprietary NoSQL database service that supports key–value and document data structures and is offered by Amazon.com as part of the Amazon Web Services portfolio. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "c102013e-923d-4841-a25b-eb8a2d22ae6f",
      term: "RDS",
      title: "Amazon RDS",
      description: `is a distributed relational database service by Amazon Web Services (AWS). It is a web service running "in the cloud" designed to simplify the setup, operation, and scaling of a relational database for use in applications. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "8303e5eb-e7b4-4bd7-a11c-7c535fbde621",
      term: "ElastiCache",
      title: "Amazon ElastiCache",
      description: `is a fully managed in-memory data store and cache service by Amazon Web Services (AWS). The service improves the performance of web applications by retrieving information from managed in-memory caches, instead of relying entirely on slower disk-based databases. [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
    {
      uuid: "797af3f2-b41d-4957-abb0-9c7b01af6523",
      term: "Redshift",
      title: "Amazon Redshift",
      description: `is a data warehouse product which forms part of the larger cloud-computing platform Amazon Web Services.  [Wikipedia]`,
      tags: [
        {
          name: "aws",
          color: "yellow",
        },
      ],
    },
  ],
};
