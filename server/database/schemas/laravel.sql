-- Create database schema
CREATE DATABASE IF NOT EXISTS cms_admin;
USE cms_admin;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'author') DEFAULT 'author',
    avatar VARCHAR(255),
    status ENUM('active', 'inactive', 'pending') DEFAULT 'pending',
    lastLogin TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_status (status)
);

-- Categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3b82f6',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_categories_slug (slug)
);

-- Posts table
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    authorId INT NOT NULL,
    categoryId INT,
    featuredImage VARCHAR(255),
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    shares INT DEFAULT 0,
    publishedAt TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL,
    
    INDEX idx_posts_slug (slug),
    INDEX idx_posts_status (status),
    INDEX idx_posts_author (authorId),
    INDEX idx_posts_category (categoryId),
    INDEX idx_posts_published (publishedAt)
);

-- Comments table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    parentId INT NULL,
    author VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status ENUM('pending', 'approved', 'spam', 'flagged') DEFAULT 'pending',
    ipAddress VARCHAR(45),
    userAgent TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES comments(id) ON DELETE CASCADE,
    
    INDEX idx_comments_post (postId),
    INDEX idx_comments_status (status),
    INDEX idx_comments_parent (parentId)
);

-- Media table
CREATE TABLE media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    originalName VARCHAR(255) NOT NULL,
    type ENUM('image', 'video', 'audio', 'document', 'archive') NOT NULL,
    mimeType VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    url VARCHAR(500) NOT NULL,
    thumbnailUrl VARCHAR(500),
    alt VARCHAR(255),
    caption TEXT,
    uploadedBy INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (uploadedBy) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_media_type (type),
    INDEX idx_media_uploader (uploadedBy)
);

-- Settings table
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    settingKey VARCHAR(100) NOT NULL,
    settingValue TEXT,
    valueType ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY idx_settings_category_key (category, settingKey)
);

-- Analytics table
CREATE TABLE analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('view', 'comment', 'share', 'download', 'login') NOT NULL,
    entityType ENUM('post', 'media', 'user', 'page') NOT NULL,
    entityId INT NOT NULL,
    userId INT NULL,
    ipAddress VARCHAR(45),
    userAgent TEXT,
    metadata JSON,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_analytics_type (type),
    INDEX idx_analytics_entity (entityType, entityId),
    INDEX idx_analytics_user (userId),
    INDEX idx_analytics_date (createdAt)
);

-- Post Media junction table
CREATE TABLE post_media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    mediaId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (mediaId) REFERENCES media(id) ON DELETE CASCADE,
    
    UNIQUE KEY idx_post_media_unique (postId, mediaId)
);

-- SEO table for posts
CREATE TABLE post_seo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    metaTitle VARCHAR(255),
    metaDescription TEXT,
    keywords JSON,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE KEY idx_post_seo_post (postId)
);
