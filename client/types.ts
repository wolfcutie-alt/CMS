export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
    id: number;                     // INT PK
    title: string;                  // VARCHAR(255)
    slug: string;                   // VARCHAR(255)
    excerpt: string | null;         // TEXT, allow null if DB allows
    content: string;                // LONGTEXT/TEXT
    status: PostStatus;             // ENUM
    authorId: number;               // INT
    categoryId: number | null;      // INT, nullable if not always set
    featuredImage: string | null;   // VARCHAR(255) URL or path
    views: number;                  // INT
    likes: number;                  // INT
    shares: number;                 // INT
    publishedAt: string | null;     // TIMESTAMP as ISO string
    created_at: string;             // TIMESTAMP
    updated_at: string;             // TIMESTAMP
}

export interface Analytic {
    id: number                     // bigint unsigned, primary key
    type: 'view' | 'comment' | 'post' | 'share' | 'download' | 'login' | 'logout' // enum/text of event type
    entityType: string             // varchar, e.g., 'post', 'comment'
    entityId: number               // bigint unsigned, referenced entity
    userId: number | null          // bigint unsigned, nullable if anonymous
    ipAddress: string              // varchar, IPv4 or IPv6
    userAgent: string              // text, raw UA string
    metadata: Record<string, any>  // json, arbitrary key values
    created_at: string             // timestamp in ISO string from DB
    updated_at: string | null      // timestamp nullable if not present
}

export interface Category {
    // auto-increment integer primary key
    id: number
  
    // VARCHAR(100) not null
    name: string
  
    // VARCHAR(100) not null, URL friendly identifier
    slug: string
  
    // TEXT, can be null in DB, so optional or null
    description?: string | null
  
    // VARCHAR(7) like "#RRGGBB", can be null
    color?: string | null
  
    // TIMESTAMP, may be null if not set
    created_at?: string | Date | null
  
    // TIMESTAMP, may be null if not set
    updated_at?: string | Date | null
}
  

export type CommentStatus = 'approved' | 'pending' | 'spam' | 'deleted'; // adjust to your ENUM values

export interface Comment {
  id: number;                 // INT, primary key
  postId: number;             // INT, references posts.id
  parentId: number | null;    // INT, nullable for top level
  author: string;             // VARCHAR(100)
  email: string;              // VARCHAR(255)
  content: string;            // TEXT
  status: CommentStatus;      // ENUM
  ipAddress: string | null;   // VARCHAR(45), nullable for IPv4 or IPv6
  userAgent: string | null;   // TEXT, nullable
  created_at: string;         // TIMESTAMP ISO string
  updated_at: string;         // TIMESTAMP ISO string
}

// Type describing the `media` table shown on the screen
export type Media = {
    id: number                        // INT
    name: string                      // VARCHAR
    originalName: string              // VARCHAR
    type: 'image' | 'video' | 'audio' | 'file' | string // ENUM, keep string fallback
    mimeType: string                  // VARCHAR
    size: number                      // BIGINT bytes
    url: string                       // VARCHAR
    thumbnailUrl: string | null       // VARCHAR, nullable
    alt: string | null                // VARCHAR, nullable
    caption: string | null            // TEXT, nullable
    uploadedAt: string                // TIMESTAMP ISO
    updatedAt: string                 // TIMESTAMP ISO
}

// Type for a row in laravel.post_media
export interface PostMedia {
    id: number;                // INT primary key
    postId: number;            // INT, FK to posts.id
    mediaId: number;           // INT, FK to media.id
    created_at: string;        // TIMESTAMP in ISO string form
  }
  
// Optional: with Date conversion helpers
export type PostMediaInput = Omit<PostMedia, "id" | "created_at"> & { created_at?: string };

// Represents a row in the `post_seo` table
export interface PostSeo {
    id: number;                 // INT, primary key
    postId: number;             // INT, foreign key to posts
    metaTitle: string | null;   // VARCHAR(255), nullable if DB allows
    metaDescription: string | null; // TEXT, nullable if DB allows
    keywords: unknown | null;   // JSON, use a more specific type if structure is known
    created_at: string;         // TIMESTAMP as ISO string
    updated_at: string;         // TIMESTAMP as ISO string
}

// Enum for the "valueType" column, matches DB ENUM
export type SettingValueType = 'string' | 'number' | 'boolean' | 'json' | 'text' | 'date' | 'unknown';

// Core row shape for laravel.settings
export interface SettingRow {
  id: number;                     // INT primary key
  category: string | null;        // VARCHAR(50), nullable if DB allows
  settingKey: string;             // VARCHAR(100)
  settingValue: string | null;    // TEXT, raw value as string
  valueType: SettingValueType;    // ENUM
  created_at: string | Date | null; // TIMESTAMP
  updated_at: string | Date | null; // TIMESTAMP
}

// Helper to parse settingValue based on valueType
export type ParsedSetting<T = unknown> = Omit<SettingRow, 'settingValue'> & {
  parsedValue: T | null;          // value cast using valueType
};