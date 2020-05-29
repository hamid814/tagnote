import React from 'react';

function* optionIdGenerator() {
  let number = 0;
  while (true) {
    number++;
    yield 'option-' + number;
  }
}

const genId = optionIdGenerator();

const getList = (subject) => {
  let list;

  if (lists[subject]) {
    list = lists[subject];
  } else {
    list = {
      title: 'Tagnote',
      options: [
        {
          id: genId.next().value,
          text: 'Home',
          action: () => () =>
            window.open(process.env.PUBLIC_URL + '/tagnote', '_self'),
        },
      ],
    };
  }

  return list;
};

const lists = {
  logo: {
    title: 'Browse Tagnote',
    options: [
      {
        id: genId.next().value,
        text: (
          <>
            <i className="icon icon-logo-radius"></i> Home
          </>
        ),
        action: () => window.open(process.env.PUBLIC_URL + '/tagnote', '_self'),
      },
      {
        id: genId.next().value,
        text: '🔎 search',
        action: () => window.open(process.env.PUBLIC_URL + '/', '_self'),
      },
      {
        id: genId.next().value,
        text: '🕶️ current tasks',
        action: () =>
          window.open(process.env.PUBLIC_URL + '/current-tasks', '_self'),
      },
      {
        id: genId.next().value,
        text: '📊 statics',
        action: () => window.open(process.env.PUBLIC_URL + '/statics', '_self'),
      },
      {
        id: genId.next().value,
        text: '📏 rules (beta)',
        action: () => window.open(process.env.PUBLIC_URL + '/rules', '_self'),
      },
    ],
  },
  note: {
    title: 'note options',
    options: [
      {
        id: genId.next().value,
        text: (
          <>
            <i className="icon icon-arrow-1"></i> Open Note
          </>
        ),
        action: 'openNote',
      },
      {
        id: genId.next().value,
        text: (
          <>
            <i className="icon icon-arrow-1"></i> Copy Text
          </>
        ),
        action: 'copyNoteText',
      },
      {
        id: genId.next().value,
        text: (
          <>
            <i className="icon icon-options-select"></i> Select
          </>
        ),
        action: 'selectNote',
      },
      {
        id: genId.next().value,
        text: (
          <>
            <i className="icon icon-arrow-1"></i> Get Share Link
          </>
        ),
        action: 'getNoteShareLink',
      },
      {
        id: genId.next().value,
        text: (
          <>
            <i className="icon icon-arrow-1"></i> Pin Note
          </>
        ),
        action: 'getNoteShareLink',
      },
      {
        id: genId.next().value,
        text: (
          <>
            <i className="icon icon-trash"></i> Make Personal
          </>
        ),
        action: 'deleteNote',
      },
      {
        id: genId.next().value,
        text: (
          <>
            <i className="icon icon-x-mark"></i> Delete Note
          </>
        ),
        addedClassName: 'red',
        action: 'deleteNote',
      },
    ],
  },
  selectedNotes: {
    title: 'notes',
    options: [
      {
        id: genId.next().value,
        text: (
          <>
            <i className="icon icon-options-merge"></i>
            merge notes
          </>
        ),
        action: () => console.log('test'),
      },
      {
        id: genId.next().value,
        text: '💩 test',
        action: () => console.log('test'),
      },
      {
        id: genId.next().value,
        text: '💩 test1',
        action: () => console.log('test'),
      },
      {
        id: genId.next().value,
        text: '💩 test2',
        action: () => console.log('test'),
      },
    ],
  },
};

export default getList;
