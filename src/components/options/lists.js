import React from 'react';

const getList = (subject) => {
  let list;

  if (lists[subject]) {
    list = lists[subject];
  } else {
    list = {
      title: 'Tagnote',
      options: [
        {
          text: 'Home',
          action: () => console.log('here'),
        },
      ],
    };
  }

  return list;
};

const lists = {
  logo: {
    title: 'browse Tagnote',
    options: [
      {
        text: (
          <>
            <i className="icon icon-logo-radius"></i> Home
          </>
        ),
        action: () => window.open(process.env.PUBLIC_URL + '/tagnote', '_self'),
      },
      {
        text: '🔎 search',
        action: () => window.open(process.env.PUBLIC_URL + '/', '_self'),
      },
      {
        text: '🕶️ current tasks',
        action: () =>
          window.open(process.env.PUBLIC_URL + '/current-tasks', '_self'),
      },
      {
        text: '📊 statics',
        action: () => window.open(process.env.PUBLIC_URL + '/statics', '_self'),
      },
      {
        text: '📏 rules (beta)',
        action: () => window.open(process.env.PUBLIC_URL + '/rules', '_self'),
      },
    ],
  },
  note: {
    title: 'note options',
    options: [
      {
        text: '⬆️ Open Note',
        action: 'openNote',
      },
    ],
  },
  selectedNotes: {
    title: 'notes',
    options: [
      {
        text: (
          <>
            <i className="icon icon-options-merge"></i>
            merge notes
          </>
        ),
        action: () => console.log('test'),
      },
      {
        text: '💩 test',
        action: () => console.log('test'),
      },
      {
        text: '💩 test1',
        action: () => console.log('test'),
      },
      {
        text: '💩 test2',
        action: () => console.log('test'),
      },
    ],
  },
};

export default getList;
