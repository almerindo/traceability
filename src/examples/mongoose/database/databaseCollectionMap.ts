import dotenv from 'dotenv';

dotenv.config();

/**
 * ENROLLMENTSSERVICE
 */
export const COURSEPROGRESSES = {
  name: 'courseprogresses',
  database:
    (process.env.ENROLLMENTS_SERVICE_DATABASE as string) ||
    'enrollmentsService',
};
export const LEVELPROGRESSES = {
  name: 'levelprogresses',
  database:
    (process.env.ENROLLMENTS_SERVICE_DATABASE as string) ||
    'enrollmentsService',
};
export const CONTENTPROGRESSES = {
  name: 'contentprogresses',
  database:
    (process.env.ENROLLMENTS_SERVICE_DATABASE as string) ||
    'enrollmentsService',
};

/**
 * SUBSCRIPTIONSERVICE
 */
export const PACKCOURSES = {
  name: 'packcourses',
  database:
    (process.env.SUBSCRIPTIONS_SERVICE_DATABASE as string) ||
    'subscriptionsService',
};
export const PACKS = {
  name: 'packs',
  database:
    (process.env.SUBSCRIPTIONS_SERVICE_DATABASE as string) ||
    'subscriptionsService',
};
export const SUBSCRIPTIONS = {
  name: 'subscriptions',
  database:
    (process.env.SUBSCRIPTIONS_SERVICE_DATABASE as string) ||
    'subscriptionsService',
};

/**
 * SANARUSERSERVICEE
 */

export const APP_USER = {
  name: 'AppUser',
  database:
    (process.env.USER_SERVICE_DATABASE as string) || 'sanarUsersService',
};

/**
 * COURSESV2SERVICE
 */

export const COURSES = {
  name: 'courses',
  database:
    (process.env.COURSESV2_SERVICE_DATABASE as string) || 'coursesV2Service',
};
export const COURSELEVELS = {
  name: 'courselevels',
  database:
    (process.env.COURSESV2_SERVICE_DATABASE as string) || 'coursesV2Service',
};
export const LEVELS = {
  name: 'levels',
  database:
    (process.env.COURSESV2_SERVICE_DATABASE as string) || 'coursesV2Service',
};
export const LEVELS_CONTENTS = {
  name: 'levelcontents',
  database:
    (process.env.COURSESV2_SERVICE_DATABASE as string) || 'coursesV2Service',
};

export const USEREVENTS = {
  name: 'userevents',
  database:
    (process.env.COURSESV2_SERVICE_DATABASE as string) || 'coursesV2Service',
};
export const TEMPLATEEVENTS = {
  name: 'templateevents',
  database:
    (process.env.COURSESV2_SERVICE_DATABASE as string) || 'coursesV2Service',
};

/**
 * CONTENTSSERVICE
 */

export const ALTERNATIVE = {
  name: 'Alternatives',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};
export const ANSWER = {
  name: 'Answer',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};
export const QUESTION = {
  name: 'Question',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const QUESTION_CATEGORY = {
  name: 'QuestionCategory',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const QUIZ = {
  name: 'Quiz',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const SPECIALTY = {
  name: 'Specialty',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const TAG = {
  name: 'Tag',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const INSTITUTION = {
  name: 'Institution',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const KNOWLEDGE_AREA = {
  name: 'KnowledgeArea',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const QUESTION_SKIP = {
  name: 'QuestionSkip',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const TAG_LINK = {
  name: 'TagLink',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const BOARD = {
  name: 'Board',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const EXAM = {
  name: 'Exam',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

export const VIDEO = {
  name: 'Video',
  database:
    (process.env.CONTENTS_SERVICE_DATABASE as string) || 'sanarContentsService',
};

/**
 * DAQUI PRA CIMA ESTÁ OK
 */

export const FLASCARDS_COLLECTION = {
  name: 'flashcards',
  database: process.env.FLASHCARD_SERVICE_DATABASE,
};

export const KNOWLEDGE_STATS_COLLECTION = {
  name: 'knowledgestats',
  database: process.env.FLASHCARD_SERVICE_DATABASE,
};

export const SPECIALTY_STATS_COLLECTION = {
  name: 'specialtystats',
  database: process.env.PERFORMANCE_SERVICE_DATABASE,
};

export const TAG_STATS_COLLECTION = {
  name: 'tagstats',
  database: process.env.PERFORMANCE_SERVICE_DATABASE,
};

export const USER_MED_INSTITUTION = {
  name: 'UserMedInstitution',
  database: process.env.USER_SERVICE_DATABASE,
};

// ###########

export const REPORTUSERWITHOUTCPF = {
  name: 'reportUserWithoutCpf',
  database: process.env.SUBSCRIPTIONS_SERVICE_DATABASE,
};

export const EXAM_STATISTIC_COLLECTION = {
  name: 'ExamStatistic',
  database: process.env.PERFORMANCE_SERVICE_DATABASE,
};

export const DECKS_COLLECTION = {
  name: 'decks',
  database: process.env.FLASHCARD_SERVICE_DATABASE,
};

export const REPORTS_COLLECTION = {
  name: 'reports',
  database: process.env.REPORT_SERVICE_DATABASE,
};

export const IEXAMS_COLLECTION = {
  name: 'exams',
  database: process.env.CRAWLED_SERVICE_DATABASE,
};

export const IEXAMSTATISTICV2_COLLECTION = {
  name: 'ExamStatisticV2',
  database: process.env.PERFORMANCE_SERVICE_DATABASE,
};
export const EXAM_STATISTIC_CATEGORY_HIERARCHY_COLLECTION = {
  name: 'ExamCategoryHierarchy',
  database: process.env.PERFORMANCE_SERVICE_DATABASE,
};
export const TAGS_STATS_SANAR_USERS_COLLECTION = {
  name: 'TagStatsSanarUsers',
  database: process.env.PERFORMANCE_SERVICE_DATABASE,
};

export const COMPARATION_QUIZ_CRAWLED_COLLECTION = {
  name: 'ComparationQuizCrawlled',
  database: process.env.CRAWLED_SERVICE_DATABASE,
};
