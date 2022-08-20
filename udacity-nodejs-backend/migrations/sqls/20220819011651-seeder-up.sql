INSERT  INTO  users(username, email, password)
VALUES ('username','admin@gmail.com', 'password123');

INSERT  INTO  users(username, email, password)
VALUES ('username1','user1@gmail.com', 'password123');

INSERT  INTO  users(username, email, password)
VALUES ('username2','admin2@gmail.com', 'password123');

INSERT  INTO  users(username, email, password)
VALUES ('username3','admin3@gmail.com', 'password123');

INSERT  INTO  users(username, email, password)
VALUES ('username4','admin4@gmail.com', 'password123');

-- Website Seeds

INSERT  INTO  websites(name, category, description, url, created_at, created_by)
VALUES ('udacity', 'Education', 'Udacity, Inc. is an American for-profit educational organization founded by Sebastian Thrun, David Stavens, ' ||
                                'and Mike Sokolsky offering massive open online courses.[5][6][7]According to Thrun, the origin of the name Udacity ' ||
                                'comes from the company''s desire to be "audacious for you, the student".[8][9] While it originally focused on offering university-style courses, ' ||
                                'it now focuses more on vocational courses for professionals.', 'https://www.udacity.com', (now()), 1);

INSERT  INTO  websites(name, category, description, url, created_at, created_by)
VALUES ('safari', 'WebBrowser', 'A school for education', 'https://www.safari.com', (now()), 1);

INSERT  INTO  websites(name, category, description, url, created_at, created_by)
VALUES ('GitHub', 'Development', 'Lets build from here, openlyinstantlyautomaticallysecurelymagicallycollaborativelytogether.
The complete developer platform to build, scale, and deliver secure software.', 'https://github.com', (now()), 1);

INSERT  INTO  websites(name, category, description, url, created_at, created_by)
VALUES ('Google.com', 'Search Engine', 'Google LLC (/ˈɡuːɡəl/ (listen)) is an American multinational technology company that focuses on search engine technology, ' ||
                                       'online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence,[9] and consumer ' ||
                                       'electronics. It has been referred to as the "most powerful company in the world"[10] and one of the world''s most valuable brands due to ' ||
                                       'its market dominance, data collection, and technological advantages in the area of artificial intelligence.[11][12][13] It is considered one of ' ||
                                       'the Big Five American information t' ||
                                       'echnology companies, alongside Amazon, Apple, Meta, and Microsoft. Google was founded on September 4, 1998, by Larry Page and Sergey Brin while they were ' ||
                                       'PhD students at Stanford University in California. Together they own about 14% of its publicly listed shares and control 56% of the stockholder voting power through' ||
                                       ' super-voting stock. The company went public via an initial public offering (IPO) in 2004. In 2015, Google was reorganized as a wholly owned subsidiary of Alphabet Inc. ' ||
                                       'Google is Alphabet''s largest subsidiary and is a holding company for Alphabet''s Internet properties and interests. Sundar Pichai was appointed CEO of Google on October 24, 2015, replacing Larry' ||
                                       ' Page, who became the CEO of Alphabet. On December 3, 2019, Pichai also became the CEO of Alphabet', 'https://www.google.com', (now()), 1);

INSERT  INTO  websites(name, category, description, url, created_at, created_by)
VALUES ('Amazon', 'Online Shop', 'Amazon.com, Inc.[1] (/ˈæməzɒn/ AM-ə-zon) is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.' ||
                                 ' It has been referred to as "one of the most influential economic and cultural forces in the world,"[5] and is one of the world''s most valuable brands.[6] It is one of the Big Five American information technology companies, alongside Alphabet, Apple, Meta, and Microsoft. Amazon was founded by Jeff Bezos from his garage in Bellevue, Washington,[7] on July 5, 1994. Initially an online marketplace for books, it has expanded into a multitude of product categories: a strategy that has earned it the moniker The Everything Store.[8] It has multiple subsidiaries including Amazon Web Services (cloud computing), Zoox (autonomous vehicles), Kuiper Systems (satellite Internet), and Amazon Lab126 (computer hardware R&D). Its other subsidiaries include Ring, Twitch, IMDb, and Whole Foods Market. Its acquisition of Whole Foods in August 2017 for US$13.4 billion substantially increased its footprint as a physical retailer.[9]', 'https://www.amazon.com', (now()), 1);
INSERT  INTO  websites(name, category, description, url, created_at, created_by)
VALUES ('Node package manager', 'Development', 'npm, Inc., is a company founded in 2014. It was acquired by GitHub, a subsidiary of Microsoft, in 2020. The company maintains the npm package manager for Node.js and the npm Registry, which hosts software packages and version control based on Git.[2]', 'https://www.npmjs.com/', (now()), 1);


-- Seed reviews

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (1, 1,  (now()), 'I so lover this site', 5);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (2, 1,  (now()), 'I so lover this site', 4);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (3, 1,  (now()), 'It was quite okay form e', 5);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (4, 1,  (now()), 'I so lover this site', 4);

-- Website 2

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (1, 2,  (now()), 'I so lover this site', 5);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (2, 2,  (now()), 'I so lover this site', 4);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (3, 2,  (now()), 'It was quite okay form e', 5);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (4, 2,  (now()), 'I so lover this site', 4);



-- website 3
INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (1, 3,  (now()), 'I so lover this site', 5);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (2, 3,  (now()), 'I so lover this site', 4);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (3, 3,  (now()), 'It was quite okay form e', 5);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (4, 3,  (now()), 'I so lover this site', 4);


INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (1, 4,  (now()), 'I so lover this site', 5);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (2, 4,  (now()), 'I so lover this site', 4);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (3, 5,  (now()), 'It was quite okay form e', 5);

INSERT INTO  reviews (user_id, website_id, created_at, comment, rating)
VALUES (4, 6,  (now()), 'I so lover this site', 4);
