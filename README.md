# Zoom Chat Participation Counter

## Why I created this App

To help count the number of times a participant has replied or chatted privately with the teacher. It worked great as I always kept Zoom Participation option to (participate with) "Host Only."

By the way, Zoom saves the chat messages in a .txt file which gets saved to the hosts's computer. At the time of making this site, Zoom used to save the text output as follows:

> ![old chat](/src/assets/old-chat.png)

> Chat contents of Zoom's old chat .txt file


## Before this site

I'd have to copy the text from the file above and paste it in an Excel file, then "Sort A to Z" using the second column in Excel (the second column is where the text file would have things like "From Person A to Person B, etc." ).

> ![old chat](/src/assets/old-chat-excel.png)

> Copy pasting contents into Excel file results in two columns

This worked great as all messages to myself (the host) would end up having the following format:

> `hh:mm:ss From Sender to Host: message`

Once sorted, I would use the "countA" function in Excel to count how many times a participant chatted with me. I'd have to do it manually for however many participants were in the meeting. Doing so would take about 5 minutes for a single meeting.

### How to count participation using Excel for the whole week

But what about the whole week's participation? You'd have to open each .txt file by navigating to it, copying and pasting its contents to the Excel file, then Sorting A to Z in the Excel file, then count using the "countA" function in Excel. It would still take about 5 - 7 minutes overall.

### Problems/Issues

However, if you had more classes, students, or meetings that you wanted to account for, this 5 minutes would just kept increasing. Teachers don't have that type of time and shouldn't have to go through all this trouble. Hence the App I created did all this in just a couple of minutes. If the amount of classes or meetings increased, then the amount of time would increase a little bit, but the number of students in class would have none or relatively little affect on it (i.e. comparatively speaking to doing in manually in Excel). Yes, having to do that a hundred times in Excel, especially when the number of times someone chats varies is very time consuming.


## After this site

### Steps for counting Zoom participation using JavaScript

To do this, I'd have to separate the text content at the end of each line. Then, I'd have to extract a substring that begins with the word "From" and ends at the "indexOf(lastname)" as all messages were private, i.e. were only sent to the host, and as all messages followed the format mentioned above. In my case, all teachers's host name is their first and last name by default, so I was able to ask them for their lastname exactly the way it appeared in the text file, and only then prompt them to upload the text files. Then, I'd have to do the harder work of sorting and counting.

### Bugs encountered

Anyways, recently when I tried to use this App, things weren't working. What could have gone wrong? So, I was back at the terminal this morning trying to debug (I have a funny story about debugging that I may be sharing later) this App. It seems that Zoom now outputs chat contents into a text (.txt) file that looks like the following:

> ![new chat](/src/assets/new-chat.png)

> Chat contents of Zoom's new chat .txt file

It now has the following format:

> `hh:mm:ss From Sender to Host: message`

But wait, what if I allow students to chat with everyone, both publicly and privately?

Well, here is the format for public chat messages:

> `hh:mm:ss From Sender : message`

Here is the format for private chat messages:

> `hh:mm:ss From Sender to Receiver(Direct Message) : message`

In either case, what I need to achieve now is first to be able to separate the text content at the end of each line, then extract a substring that begins with the word "From" and ends at the colon character, ":". Once this is achieved, I have to do the hard part of sorting and counting occurrences of each string within say an array or an object. I won't get into the explanation here but the code and the site can be found at the following links:

Here's the GitHub repository:

<https://github.com/ytrkptl/zoom-chat-participation-counter>

Here's the link to site itself:

<https://participation-counter.netlify.app/>

Note that without online articles, StackOverflow, or Google search, none of this would have been possible. Probably the biggest thanks I owe to is Andrei Neagoie and his courses on ZeroToMastery or Udemy.

In the future, if the Zoom Chat output file changes, my App may break again and I'll have to update the code once again. This will probably happen as I requested Zoom to add some features this morning and they were nice enough to add it to their features list. If the features get implemented, then there will be more work for me to do as well.

#### - By Yatrik Patel, November 4, 2020
