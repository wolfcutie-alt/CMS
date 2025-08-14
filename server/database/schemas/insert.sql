USE laravel;

-- Insert Users
INSERT INTO users (id, name, email, password, role, avatar, status, lastLogin, created_at, updated_at) VALUES
(1, 'John Doe', 'john@example.com', '$2b$10$hash1', 'admin', '/placeholder.svg?height=40&width=40&text=JD', 'active', '2024-01-15 10:30:00', '2023-06-15 09:00:00', '2024-01-15 10:30:00'),
(2, 'Jane Smith', 'jane@example.com', '$2b$10$hash2', 'editor', '/placeholder.svg?height=40&width=40&text=JS', 'active', '2024-01-14 15:45:00', '2023-08-22 14:20:00', '2024-01-14 15:45:00'),
(3, 'Mike Johnson', 'mike@example.com', '$2b$10$hash3', 'author', '/placeholder.svg?height=40&width=40&text=MJ', 'inactive', '2024-01-10 09:15:00', '2023-11-03 11:30:00', '2024-01-10 09:15:00'),
(4, 'Sarah Wilson', 'sarah@example.com', '$2b$10$hash4', 'editor', '/placeholder.svg?height=40&width=40&text=SW', 'active', '2024-01-13 14:20:00', '2023-05-10 16:45:00', '2024-01-13 14:20:00'),
(5, 'Alex Brown', 'alex@example.com', '$2b$10$hash5', 'author', '/placeholder.svg?height=40&width=40&text=AB', 'pending', NULL, '2024-01-11 10:15:00', '2024-01-11 10:15:00');

-- Insert Categories
INSERT INTO categories (id, name, slug, description, color, created_at, updated_at) VALUES
(1, 'Tutorial', 'tutorial', 'Step-by-step guides and tutorials', '#3b82f6', '2024-01-15 09:00:00', '2024-01-15 09:00:00'),
(2, 'Guide', 'guide', 'Comprehensive guides and documentation', '#10b981', '2024-01-14 10:30:00', '2024-01-14 10:30:00'),
(3, 'Opinion', 'opinion', 'Editorial content and opinions', '#f59e0b', '2024-01-13 11:15:00', '2024-01-13 11:15:00'),
(4, 'Technical', 'technical', 'Technical deep-dives and analysis', '#8b5cf6', '2024-01-12 14:45:00', '2024-01-12 14:45:00'),
(5, 'News', 'news', 'Latest news and updates', '#ef4444', '2024-01-11 16:20:00', '2024-01-11 16:20:00');

-- Insert Posts
INSERT INTO posts (id, title, slug, excerpt, content, status, authorId, categoryId, featuredImage, views, likes, shares, publishedAt, created_at, updated_at) VALUES
(1, 'Getting Started with Next.js 15', 'getting-started-with-nextjs-15', 'Learn the fundamentals of Next.js 15 and build your first application with the latest features.', '# Getting Started with Next.js 15\n\nNext.js 15 introduces several exciting new features that make building React applications even more powerful and efficient.\n\n## Key Features\n\n1. **Improved Performance**: Enhanced server-side rendering and static generation\n2. **Better Developer Experience**: Improved error messages and debugging tools\n3. **New APIs**: Additional hooks and utilities for common use cases\n\n## Installation\n\nTo get started with Next.js 15, run:\n\n```bash\nnpx create-next-app@latest my-app\ncd my-app\nnpm run dev\n```\n\n## Your First Component\n\nCreate a simple component:\n\n```jsx\nexport default function Welcome() {\n  return <h1>Welcome to Next.js 15!</h1>\n}\n```\n\nThis is just the beginning of what you can build with Next.js 15!', 'published', 1, 1, '/placeholder.svg?height=400&width=800&text=Next.js+15+Tutorial', 5234, 89, 45, '2024-01-15 10:00:00', '2024-01-15 09:30:00', '2024-01-15 10:00:00'),

(2, 'Building Modern Web Applications', 'building-modern-web-applications', 'Explore modern web development practices and tools for building scalable applications.', '# Building Modern Web Applications\n\nModern web development has evolved significantly with new tools, frameworks, and best practices.\n\n## Key Principles\n\n1. **Component-Based Architecture**\n2. **State Management**\n3. **Performance Optimization**\n4. **Accessibility**\n5. **Testing**\n\n## Technology Stack\n\n- **Frontend**: React, Vue, or Angular\n- **Backend**: Node.js, Python, or Go\n- **Database**: PostgreSQL, MongoDB\n- **Deployment**: Vercel, Netlify, AWS\n\n## Best Practices\n\n- Use TypeScript for type safety\n- Implement proper error handling\n- Follow accessibility guidelines\n- Write comprehensive tests\n- Optimize for performance', 'draft', 2, 2, '/placeholder.svg?height=400&width=800&text=Modern+Web+Apps', 2987, 43, 21, NULL, '2024-01-14 11:20:00', '2024-01-14 15:45:00'),

(3, 'The Future of Web Development', 'the-future-of-web-development', 'Discover upcoming trends and technologies that will shape the future of web development.', '# The Future of Web Development\n\nWeb development continues to evolve at a rapid pace. Here are the trends shaping our future.\n\n## Emerging Technologies\n\n### WebAssembly (WASM)\n- Near-native performance in browsers\n- Support for multiple programming languages\n- Better for compute-intensive applications\n\n### Edge Computing\n- Reduced latency\n- Better user experience\n- Distributed architecture\n\n### AI Integration\n- Automated code generation\n- Intelligent user interfaces\n- Personalized experiences\n\n## What to Expect\n\n1. **Serverless Architecture** will become mainstream\n2. **JAMstack** will continue to grow\n3. **Progressive Web Apps** will replace native apps\n4. **Voice interfaces** will become common\n5. **AR/VR** integration in web applications', 'published', 3, 3, '/placeholder.svg?height=400&width=800&text=Future+of+Web+Dev', 2654, 38, 19, '2024-01-13 14:30:00', '2024-01-13 13:45:00', '2024-01-13 14:30:00'),

(4, 'CSS Grid vs Flexbox: When to Use What', 'css-grid-vs-flexbox-when-to-use-what', 'A comprehensive comparison of CSS Grid and Flexbox with practical examples.', '# CSS Grid vs Flexbox: When to Use What\n\nBoth CSS Grid and Flexbox are powerful layout systems, but they serve different purposes.\n\n## Flexbox\n\n### Best for:\n- One-dimensional layouts (row or column)\n- Component-level layout\n- Distributing space among items\n- Aligning items\n\n### Example:\n```css\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```\n\n## CSS Grid\n\n### Best for:\n- Two-dimensional layouts (rows and columns)\n- Page-level layout\n- Complex grid systems\n- Overlapping elements\n\n### Example:\n```css\n.grid-container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-rows: auto 1fr auto;\n  gap: 1rem;\n}\n```\n\n## Decision Matrix\n\n| Use Case | Flexbox | Grid |\n|----------|---------|------|\n| Navigation bar | ✅ | ❌ |\n| Card layout | ✅ | ✅ |\n| Page layout | ❌ | ✅ |\n| Form controls | ✅ | ❌ |\n| Image gallery | ❌ | ✅ |', 'published', 4, 1, '/placeholder.svg?height=400&width=800&text=CSS+Grid+vs+Flexbox', 4123, 67, 32, '2024-01-12 16:15:00', '2024-01-12 15:30:00', '2024-01-12 16:15:00'),

(5, 'React Server Components Explained', 'react-server-components-explained', 'Understanding React Server Components and how they improve application performance.', '# React Server Components Explained\n\nReact Server Components represent a new paradigm in React development.\n\n## What are Server Components?\n\nServer Components are React components that render on the server and send the result to the client.\n\n### Benefits:\n1. **Reduced Bundle Size**: Server components don''t ship to the client\n2. **Better Performance**: Less JavaScript to download and execute\n3. **Direct Database Access**: Can fetch data directly without APIs\n4. **Improved SEO**: Content is rendered on the server\n\n## Client vs Server Components\n\n### Server Components:\n- Render on the server\n- Can access backend resources\n- Cannot use browser APIs\n- Cannot use state or effects\n\n### Client Components:\n- Render in the browser\n- Can use hooks and state\n- Can access browser APIs\n- Interactive and dynamic\n\n## Example\n\n```jsx\n// Server Component\nasync function BlogPost({ id }) {\n  const post = await db.posts.findById(id);\n  \n  return (\n    <article>\n      <h1>{post.title}</h1>\n      <p>{post.content}</p>\n    </article>\n  );\n}\n\n// Client Component\n''use client'';\nfunction LikeButton({ postId }) {\n  const [liked, setLiked] = useState(false);\n  \n  return (\n    <button onClick={() => setLiked(!liked)}>\n      {liked ? ''❤️'' : ''🤍''}\n    </button>\n  );\n}\n```', 'draft', 5, 4, '/placeholder.svg?height=400&width=800&text=React+Server+Components', 3456, 54, 28, NULL, '2024-01-11 12:45:00', '2024-01-11 17:20:00');

-- Insert Post SEO data
INSERT INTO post_seo (postId, metaTitle, metaDescription, keywords) VALUES
(1, 'Getting Started with Next.js 15 - Complete Guide', 'Learn Next.js 15 fundamentals with this comprehensive tutorial. Build your first app with the latest features and best practices.', '["nextjs", "react", "tutorial", "web development"]'),
(2, 'Building Modern Web Applications - Best Practices', 'Learn modern web development practices and tools for building scalable, maintainable applications.', '["web development", "modern", "scalable", "best practices"]'),
(3, 'The Future of Web Development - Trends and Technologies', 'Explore upcoming trends and technologies that will shape the future of web development.', '["future", "web development", "trends", "technology"]'),
(4, 'CSS Grid vs Flexbox: Complete Comparison Guide', 'Learn when to use CSS Grid vs Flexbox with practical examples and decision guidelines.', '["css", "grid", "flexbox", "layout", "comparison"]'),
(5, 'React Server Components Explained - Complete Guide', 'Learn React Server Components, their benefits, and how they improve application performance.', '["react", "server components", "performance", "ssr"]');

-- Insert Media files
INSERT INTO media (id, name, originalName, type, mimeType, size, url, thumbnailUrl, alt, caption, uploadedBy, created_at, updated_at) VALUES
(1, 'hero-banner.jpg', 'hero-banner.jpg', 'image', 'image/jpeg', 2516582, '/uploads/hero-banner.jpg', '/uploads/thumbnails/hero-banner-thumb.jpg', 'Hero banner for homepage', 'Main hero banner showcasing our latest features', 1, '2024-01-15 09:00:00', '2024-01-15 09:00:00'),

(2, 'product-demo.mp4', 'product-demo.mp4', 'video', 'video/mp4', 15728640, '/uploads/product-demo.mp4', '/uploads/thumbnails/product-demo-thumb.jpg', 'Product demonstration video', 'Complete walkthrough of our product features', 2, '2024-01-14 10:30:00', '2024-01-14 10:30:00'),

(3, 'user-guide.pdf', 'user-guide.pdf', 'document', 'application/pdf', 1887437, '/uploads/user-guide.pdf', '/uploads/thumbnails/user-guide-thumb.jpg', 'User guide PDF document', 'Comprehensive user guide for new users', 1, '2024-01-13 11:15:00', '2024-01-13 11:15:00'),

(4, 'background-music.mp3', 'background-music.mp3', 'audio', 'audio/mpeg', 4299161, '/uploads/background-music.mp3', '/uploads/thumbnails/audio-placeholder.jpg', 'Background music for videos', 'Royalty-free background music for video content', 3, '2024-01-12 14:45:00', '2024-01-12 14:45:00'),

(5, 'logo-variants.zip', 'logo-variants.zip', 'archive', 'application/zip', 913408, '/uploads/logo-variants.zip', '/uploads/thumbnails/archive-placeholder.jpg', 'Logo variants archive', 'Collection of logo variants in different formats', 4, '2024-01-11 16:20:00', '2024-01-11 16:20:00'),

(6, 'team-photo.jpg', 'team-photo.jpg', 'image', 'image/jpeg', 3251200, '/uploads/team-photo.jpg', '/uploads/thumbnails/team-photo-thumb.jpg', 'Team photo', 'Our amazing team at the annual company retreat', 1, '2024-01-10 13:30:00', '2024-01-10 13:30:00');

-- Insert Comments
INSERT INTO comments (id, postId, parentId, author, email, content, status, created_at, updated_at) VALUES
(1, 1, NULL, 'John Doe', 'john@example.com', 'This is a great tutorial! Really helped me understand the concepts better. Looking forward to more content like this.', 'approved', '2024-01-15 10:30:00', '2024-01-15 10:30:00'),

(2, 2, NULL, 'Jane Smith', 'jane@example.com', 'I''m having trouble with the installation step. Could you provide more details about the setup process?', 'pending', '2024-01-14 15:45:00', '2024-01-14 15:45:00'),

(3, 3, NULL, 'Mike Johnson', 'mike@example.com', 'Spam content here with irrelevant links and promotional material that should be moderated.', 'spam', '2024-01-13 09:15:00', '2024-01-13 09:15:00'),

(4, 4, NULL, 'Sarah Wilson', 'sarah@example.com', 'Excellent explanation of CSS Grid vs Flexbox. The examples really clarify when to use each approach.', 'approved', '2024-01-12 14:20:00', '2024-01-12 14:20:00'),

(5, 5, NULL, 'Alex Brown', 'alex@example.com', 'This comment contains inappropriate language and should be reviewed by moderators before approval.', 'flagged', '2024-01-11 11:30:00', '2024-01-11 11:30:00'),

-- Reply comments
(6, 1, 1, 'Admin', 'admin@example.com', 'Thank you for the feedback! We''re glad you found it helpful.', 'approved', '2024-01-15 11:00:00', '2024-01-15 11:00:00'),

(7, 4, 4, 'Author', 'author@example.com', 'Thanks Sarah! I''m planning a follow-up article with more advanced examples.', 'approved', '2024-01-12 17:30:00', '2024-01-12 17:30:00');

-- Insert Post-Media relationships
INSERT INTO post_media (postId, mediaId) VALUES
(1, 1), -- Getting Started with Next.js 15 uses hero-banner.jpg
(1, 3), -- Getting Started with Next.js 15 uses user-guide.pdf
(2, 2), -- Building Modern Web Applications uses product-demo.mp4
(2, 3), -- Building Modern Web Applications uses user-guide.pdf
(2, 4), -- Building Modern Web Applications uses background-music.mp3
(3, 1), -- The Future of Web Development uses hero-banner.jpg
(3, 6); -- The Future of Web Development uses team-photo.jpg

-- Insert Settings
INSERT INTO settings (category, settingKey, settingValue, valueType) VALUES
-- General Settings
('general', 'siteName', 'CMS Admin', 'string'),
('general', 'siteDescription', 'A modern content management system built with Next.js', 'string'),
('general', 'siteUrl', 'https://example.com', 'string'),
('general', 'adminEmail', 'admin@example.com', 'string'),
('general', 'timezone', 'UTC', 'string'),
('general', 'dateFormat', 'YYYY-MM-DD', 'string'),
('general', 'language', 'en', 'string'),

-- Content Settings
('content', 'postsPerPage', '10', 'number'),
('content', 'allowComments', 'true', 'boolean'),
('content', 'moderateComments', 'true', 'boolean'),
('content', 'allowRegistration', 'true', 'boolean'),
('content', 'defaultUserRole', 'author', 'string'),
('content', 'autoSave', 'true', 'boolean'),
('content', 'autoSaveInterval', '30', 'number'),
('content', 'enableRevisions', 'true', 'boolean'),
('content', 'maxRevisions', '10', 'number'),

-- Email Settings
('email', 'provider', 'smtp', 'string'),
('email', 'smtpHost', 'smtp.example.com', 'string'),
('email', 'smtpPort', '587', 'number'),
('email', 'smtpUsername', 'noreply@example.com', 'string'),
('email', 'smtpPassword', 'encrypted_password', 'string'),
('email', 'fromName', 'CMS Admin', 'string'),
('email', 'fromEmail', 'noreply@example.com', 'string'),
('email', 'enableTLS', 'true', 'boolean'),

-- Security Settings
('security', 'enableTwoFactor', 'false', 'boolean'),
('security', 'sessionTimeout', '24', 'number'),
('security', 'maxLoginAttempts', '5', 'number'),
('security', 'lockoutDuration', '30', 'number'),
('security', 'passwordMinLength', '8', 'number'),
('security', 'requireSpecialChars', 'true', 'boolean'),
('security', 'enableCaptcha', 'false', 'boolean'),
('security', 'allowedFileTypes', '["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx"]', 'json'),
('security', 'maxFileSize', '10485760', 'number'),

-- Notification Settings
('notifications', 'emailNotifications', 'true', 'boolean'),
('notifications', 'commentNotifications', 'true', 'boolean'),
('notifications', 'newUserNotifications', 'true', 'boolean'),
('notifications', 'systemNotifications', 'true', 'boolean'),
('notifications', 'digestFrequency', 'daily', 'string'),

-- Advanced Settings
('advanced', 'enableCache', 'true', 'boolean'),
('advanced', 'cacheTimeout', '3600', 'number'),
('advanced', 'enableCompression', 'true', 'boolean'),
('advanced', 'enableCDN', 'false', 'boolean'),
('advanced', 'cdnUrl', '', 'string'),
('advanced', 'maintenanceMode', 'false', 'boolean'),
('advanced', 'debugMode', 'false', 'boolean'),
('advanced', 'logLevel', 'info', 'string'),
('advanced', 'backupFrequency', 'daily', 'string'),
('advanced', 'maxBackups', '7', 'number'),

-- Theme Settings
('theme', 'primaryColor', '#3b82f6', 'string'),
('theme', 'secondaryColor', '#10b981', 'string'),
('theme', 'accentColor', '#f59e0b', 'string'),
('theme', 'backgroundColor', '#ffffff', 'string'),
('theme', 'textColor', '#1f2937', 'string'),
('theme', 'darkMode', 'false', 'boolean'),
('theme', 'customCSS', '', 'string'),
('theme', 'logo', '/uploads/logo.png', 'string'),
('theme', 'favicon', '/uploads/favicon.ico', 'string');

-- Insert Analytics data
INSERT INTO analytics (type, entityType, entityId, userId, ipAddress, userAgent, metadata, created_at) VALUES
-- Post views
('view', 'post', 1, 1, '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '{"referrer": "google.com", "sessionId": "sess_123"}', '2024-01-15 10:35:00'),
('view', 'post', 1, 2, '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '{"referrer": "direct", "sessionId": "sess_124"}', '2024-01-15 11:20:00'),
('view', 'post', 4, 3, '192.168.1.102', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36', '{"referrer": "twitter.com", "sessionId": "sess_125"}', '2024-01-14 14:15:00'),
('view', 'post', 3, NULL, '192.168.1.103', 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)', '{"referrer": "facebook.com", "sessionId": "sess_126"}', '2024-01-13 16:45:00'),

-- Comments
('comment', 'post', 1, 1, '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '{"commentId": 1}', '2024-01-15 10:30:00'),
('comment', 'post', 2, 2, '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '{"commentId": 2}', '2024-01-14 15:45:00'),
('comment', 'post', 4, 4, '192.168.1.104', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '{"commentId": 4}', '2024-01-12 14:20:00'),

-- Shares
('share', 'post', 1, 1, '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '{"platform": "twitter"}', '2024-01-15 12:00:00'),
('share', 'post', 4, 4, '192.168.1.104', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '{"platform": "linkedin"}', '2024-01-12 16:30:00'),

-- Media downloads
('download', 'media', 3, 1, '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '{"fileSize": 1887437}', '2024-01-15 11:45:00'),
('download', 'media', 2, 2, '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '{"fileSize": 15728640}', '2024-01-14 13:20:00'),

-- User logins
('login', 'user', 1, 1, '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '{"loginMethod": "email"}', '2024-01-15 10:30:00'),
('login', 'user', 2, 2, '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '{"loginMethod": "email"}', '2024-01-14 15:45:00'),
('login', 'user', 4, 4, '192.168.1.104', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '{"loginMethod": "email"}', '2024-01-13 14:20:00');
