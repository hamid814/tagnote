import React from 'react';

const options = {
  logo: {
    title: 'browse Tagnote',
    list: [
      {
        text: (
          <>
            <i class="icon icon-logo-radius"></i> Home
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
    list: [
      {
        text: '⬆️ Open Note',
        action: 'openNote',
      },
    ],
  },
  selectedNotes: {
    title: 'notes',
    list: [
      {
        text: '📦 merge notes',
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

export default options;
