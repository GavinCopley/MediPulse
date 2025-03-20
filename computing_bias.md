---
layout: base
title: Computing Bias
description: Computing from Collegeboard's AP CSP curriculum
comments: true
permalink: /csp/teach/computing_bias
menu: nav/home.html
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Computing Bias</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2, h3 {
            color: #333;
        }
        p {
            margin-bottom: 10px;
        }
        ul {
            margin-bottom: 20px;
        }
        blockquote {
            font-style: italic;
            color: #555;
            margin: 20px 0;
            padding: 10px;
            border-left: 5px solid #ccc;
        }
        iframe {
            display: block;
            margin: 20px 0;
        }
    </style>
</head>
<body>

    <h1>Understanding Computer Bias</h1>
    <p><strong>Published on:</strong> March 17, 2025</p>
    <p><strong>Reading Time:</strong> ~5 minutes</p>

    <p>Have you ever noticed how Netflix keeps recommending the same types of shows over and over? Or how voice assistants (like Siri or Alexa) almost always have a female voice by default? These little quirks might seem harmless, but they can hint at something larger behind the scenes: <strong>computer bias</strong>.</p>

    <p>In this blog, we’ll unpack what computer bias is, share some simple real-world examples, and explore how we can create more fair and inclusive technologies.</p>

    <hr>

    <h2>What Is Computer Bias?</h2>
    <p>Think of “computer bias” as <strong>unfair preferences</strong> built into a computer system. Often, this bias isn’t deliberate—rather, it’s a result of how people <strong>design, test, or use</strong> these systems. Some typical ways bias sneaks in:</p>
    <ul>
        <li><strong>Data Issues:</strong> If you train an algorithm on data that’s missing certain types of people or situations, the system might perform poorly for those it hasn’t “seen” enough of.</li>
        <li><strong>Design Choices:</strong> Maybe the developer assumed everyone uses the product the same way, leading to one-size-fits-all features that accidentally exclude some users.</li>
        <li><strong>Testing Gaps:</strong> Sometimes, teams test only with certain groups—say, colleagues or friends—missing feedback from the broader population.</li>
    </ul>

    <blockquote>Key Takeaway: Humans are behind every tech tool, so our biases can show up in the algorithms we create—even if we don’t mean for it to happen.</blockquote>

    <hr>

    <h2>Everyday Examples of Bias</h2>

    <h3>1. Netflix Recommendations</h3>
    <p>Netflix is known for suggesting shows and movies based on what you’ve watched before. While it’s helpful, the recommendation system can unintentionally “pigeonhole” you. If you mostly watch comedies, Netflix might stop suggesting documentaries or foreign films, even if you’d actually love them. This can keep you stuck in a loop of the same types of content.</p>
    <p><strong>Why is that biased?</strong></p>
    <ul>
        <li>The algorithm heavily leans on past choices and might <strong>ignore</strong> other genres or shows that don’t fit its pattern.</li>
        <li>People who share a profile (like families) might get skewed recommendations that don’t reflect everyone’s interests.</li>
    </ul>

    <h3>2. Virtual Assistants with Female Voices</h3>
    <p>It’s common for digital assistants (like Siri or Alexa) to default to a female voice. While some platforms offer alternatives, the default often remains female.</p>
    <p><strong>Why might this be a problem?</strong></p>
    <ul>
        <li>It can subtly reinforce stereotypes that <strong>women</strong> are “helpers” or “assistants.”</li>
        <li>It may exclude people who’d prefer a different voice or feel more comfortable with another default option.</li>
    </ul>

    <h3>3. Social Media Age Gaps</h3>
    <p>If you look at who uses TikTok (generally younger folks) versus who prefers Facebook (often older demographics), you’ll see a clear age divide. Sometimes these platforms don’t explicitly <strong>stop</strong> people from different age groups from joining; however, their design, marketing, and trends can unintentionally favor one demographic over another.</p>

    <hr>

    <h2>The HP Camera Incident: A Closer Look</h2>
    <p>One famous example involved an HP laptop camera that couldn’t reliably track the faces of people with darker skin tones. A user posted a video calling the camera “racist” because it followed lighter-skinned faces with ease but struggled to track darker-skinned faces.</p>
    <ul>
        <li><strong>Was it intentional?</strong> The user didn’t think HP deliberately designed it this way, but the final result was still unfair.</li>
        <li><strong>Why did it happen?</strong> Likely <strong>limited test data</strong> during development. If you only test facial tracking on people with lighter skin tones, you miss potential issues for everyone else.</li>
        <li><strong>Is it harmful?</strong> Yes. Beyond frustration, it alienates users and sends the message that the technology “isn’t made” for them.</li>
        <li><strong>Should it be corrected?</strong> Absolutely. More comprehensive testing and more diverse datasets would make the camera work better for everyone.</li>
    </ul>

    <hr>

    <h2>Avoiding Bias in Tech</h2>
    <p>So, how do we stop bias from creeping into our algorithms and products? Here are a few <strong>practical tips</strong>:</p>
    <ul>
        <li><strong>Expand Your Data:</strong> Gather as many different types of samples as possible. For Netflix-like recommendations, that might mean training on a wide range of viewing histories from diverse users.</li>
        <li><strong>Encourage Diverse Teams:</strong> People from varied backgrounds ask different questions and notice different problems. This helps catch unintentional biases <strong>before</strong> a product launches.</li>
        <li><strong>Test, Test, Test:</strong> Don’t just rely on your friend group or your coworkers. Try “beta testing” with users of all ages, races, and abilities. Seek feedback and see if certain groups are having more issues.</li>
        <li><strong>Document Your Assumptions:</strong> Be transparent about how the algorithm makes decisions. If you know it’s heavily focused on past user behavior, note that clearly.</li>
    </ul>

    <hr>

    <iframe width="560" height="315" src="https://www.youtube.com/embed/uV3sWo0J4Pw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    <h2>Why It All Matters</h2>
    <p>When biases go unchecked, technology can exclude people, reinforce negative stereotypes, or limit choices. By staying aware of potential pitfalls—from the data we collect to how we test and design our products—we can build a more <strong>inclusive</strong> digital world. After all, technology should be for everyone.</p>

    <p><strong>Ready to take action?</strong></p>
    <ul>
        <li><strong>Try looking at your streaming platform’s recommendations.</strong> Do they all look the same? If so, shake things up: watch a documentary or a foreign-language show to encourage variety in your recommendations.</li>
        <li><strong>Voice your preferences.</strong> If you have a smart speaker or assistant, see if you can change the default voice. Notice how that small shift might affect how you interact with it.</li>
        <li><strong>Share your experiences.</strong> If you see tech that doesn’t work well for certain groups, point it out. Often, engineers and designers aren’t aware there’s a problem until users speak up.</li>
    </ul>

    <hr>

    <h2>Join the Conversation</h2>
    <ul>
        <li><strong>Have an example of bias you’ve encountered in apps or websites?</strong> Add a comment below!</li>
        <li><strong>Working on your own project?</strong> Test it with friends and classmates who might use it differently. You could catch issues early and create something that <strong>everyone</strong> can enjoy.</li>
    </ul>

    <p>We all have a part to play in recognizing and fighting computer bias. By being informed and proactive, we can help tech become a force that truly <strong>includes</strong> rather than excludes.</p>

    <h3>Popcorn Hack #1:</h3>
    <p>Provide an example of a movie, TV show, video game, or software that demonstrates bias and specify who is affected by it. Explain a potential cause of this bias.</p>

    <h3>Popcorn Hack #2:</h3>
    <p>Which of the following is a reason for computing bias?</p>
    <ul>
        <li>A) Limited or unbalanced training data</li>
        <li>B) Algorithms making completely random decisions</li>
        <li>C) Computers having personal opinions</li>
        <li>D) AI systems working without any human influence</li>
    </ul>

    <h3>Popcorn Hack #3:</h3>
    <p>What is computer bias, and how can it be caused by intentional or unintentional factors in software development? Provide an example and explain how programmers can reduce bias in their algorithms.</p>

    <h3>Homework Hack #1:</h3>
    <p>Imagine a university is using an AI system to screen scholarship applications. Over time, students notice that the system tends to select more applicants from wealthy neighborhoods while rejecting many from lower-income areas.</p>
    <ul>
        <li>What might be causing this bias?</li>
        <li>How could the university fix this issue to ensure fair selection for all students?</li>
    </ul>

</body>
</html>aaa