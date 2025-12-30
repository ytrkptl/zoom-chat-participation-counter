# Automating Zoom Participation: From Manual Excel Grunt Work to Web App

As an educator, tracking student participation is vital for engagement and grading, but the process can be incredibly tedious. This project was born out of the need to automate the manual grunt work of counting Zoom chat messages, allowing teachers to focus on teaching rather than administrative tasks.

## The Context: Participation as a Grade

This application was built for a specific use case: a remote classroom where participation was graded based on chat activity.

As a remote teacher teaching children over Zoom, I set a requirement that participation via chat messages counted towards their participation grade. While answering math questions was the primary way to participate, a couple of greeting messages (like "Good morning") were acceptable as well. This meant every single message needed to be tracked to ensure students received the credit they earned.

## The Challenge: Manual Tracking Overload

To count participation manually, I had to rely on Zoom's text logs. At the time I started, Zoom saved chat messages in a specific format:

![old chat](/src/assets/old-chat2.png)

### The Excel Nightmare

My previous workflow involved copying the text into an Excel file, sorting it, and using formulas to count messages.

1. Copy text from the Zoom log.
2. Paste into Excel.
3. Sort column to group messages by sender ("From Person A...").
4. Use the `countA` function to tally participation.

![old chat in Excel](/src/assets/old-chat-excel3.png)

For a single meeting, this took about 5 minutes. It was manageable, but inefficient.

### Accounting for Weekly Participation

The real problem arose when trying to track participation over a full week or for multiple classes. If you have 5 classes a week, that 5-minute task turns into 25-35 minutes of mindless copy-pasting and sorting. As the number of students or meetings increases, the manual overhead becomes unsustainable.

Teachers simply don't have that kind of time to waste.

## The Solution: Automating with JavaScript

I built this web app to reduce that weekly workload from 30+ minutes to just a few seconds. The app parses the Zoom chat logs, aggregates the data, and presents a clear count of participation for each student.

**Key Benefits:**

* **Speed:** Instant results regardless of class size.
* **Reliability:** Eliminates human error in counting.
* **Privacy:** All processing happens locally in your browser. No data is sent to any external server.
* **Workflow:** Frees up educators to focus on student engagement.

[**Live Demo**](https://zoom-chat-counter.yatrik.dev) | [**GitHub Repository**](https://github.com/ytrkptl/zoom-chat-participation-counter)

## Technical Deep Dive: Parsing Zoom Logs

The core of the application is a string parser that normalizes the chat log formats.

### Handling Zoom Format Changes

Zoom updated their chat log format during the development of this tool, which broke the initial version. The new format looks like this:

![new chat](/src/assets/new-chat2.png)

Whether the message is public or private, the relevant metadata is contained in the string segment starting with "From" and ending with a colon `:`.

* **Public:** `hh:mm:ss From Sender : message`
* **Private:** `hh:mm:ss From Sender to Receiver(Direct Message) : message`

### The Parsing Logic

The application splits the log file by newlines and iterates through each line to extract the sender's information. Here is a snippet of the core logic from `chatParser.ts`:

```typescript
export const hasCertainPattern = (data: string): string[] => {
  const result = splitByLine(data);
  const someArray: string[] = [];

  const fromIndex = result[0]?.indexOf("From") ?? -1;

  for (let i = 0; i < result.length; i++) {
    // Extract the substring starting from "From"
    let sub = result[i].substring(fromIndex);
    // Cut off at the colon to get just the meta info (e.g. "From John Doe to Host")
    sub = sub.substring(0, sub.indexOf(":"));
    
    if (sub !== "") {
      someArray.push(sub);
    }
  }

  return someArray;
};
```

This extracted array is then used to create a frequency map (`{ 'From Student A': 5, ... }`) which powers the final results table.

## Sorting and Filtering

Beyond simple counting, the application offers sorting and filtering to make the data more usable.

### Sorting by Participation

The primary goal is to see who participated the most. We can sort the frequency map by count in descending order:

```typescript
/**
 * Converts word map to sorted array of results
 * Sorts by count in descending order
 */
export const sortByCount = (
  wordsMap: Record<string, number>
): ParticipantResult[] => {
  const finalWordsArray: ParticipantResult[] = Object.keys(wordsMap).map(
    (key) => ({
      name: key,
      total: wordsMap[key]
    })
  );

  finalWordsArray.sort((a, b) => b.total - a.total);

  return finalWordsArray;
};
```

### Sorting Alphabetically

To find specific students easily, results can be sorted alphabetically. This uses a dynamic sort function:

```typescript
/**
 * Dynamically sorts array by property
 * Use "-property" prefix to sort in reverse order
 */
export const dynamicSort = (property: string) => {
  let sortOrder = 1;
  let sortProperty = property;

  if (property[0] === "-") {
    sortOrder = -1;
    sortProperty = property.substring(1);
  }

  return (a: ParticipantResult, b: ParticipantResult) => {
    if (sortOrder === -1) {
      return b[sortProperty as keyof ParticipantResult]
        .toString()
        .localeCompare(a[sortProperty as keyof ParticipantResult].toString());
    } else {
      return a[sortProperty as keyof ParticipantResult]
        .toString()
        .localeCompare(b[sortProperty as keyof ParticipantResult].toString());
    }
  };
};
```

### Filtering Host Messages

Sometimes, students message the host privately. We can filter for these messages specifically to see who is engaging directly:

```typescript
  // this function will filter the messages and return only the ones sent to the host only
  const filterMessagesToHostOnly = () => {
    const data = readData();
    if (data) {
      const filteredArray = data.filter(
        (el) =>
          el.name.includes(`to  ${hostname}(Direct Message)`) ||
          el.name.includes(`to  ${hostname}(Privately)`)
      );
      const alphabetized = filteredArray.sort(dynamicSort("name"));
      updateSortedArray(alphabetized);
    }
  };
```

## Adapting to Change

Software that relies on third-party output formats (like Zoom logs) is inherently fragile. When Zoom changed their output format, my app initially failed. Debugging this required analyzing the new text structure and updating the parsing logic to handle both "Direct Message" and standard formats.

## Updates

The application was last verified to be in working condition in November 2025.

## Credits

* **Author:** Yatrik Patel
* **Created:** November 4, 2020
* **Last Updated:** December 30, 2025
* **Editorial Assistance:** Gemini 3 Pro (for helping me update this article)
* **Images:**
  * Diagrams made with Excalidraw
  * [Chris Montgomery on Unsplash](https://unsplash.com/photos/smgTvepind4)
  * [No-longer-here on Pixabay](https://pixabay.com/users/no-longer-here-19203/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1768845)
