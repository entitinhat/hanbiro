export default (editor: any, config: any) => {
  // editor.RichTextEditor.remove('link');

  // editor.RichTextEditor.add('dropcap', {
  //   icon: '<b>D<sup>c</sup></b>',
  //   attributes: { title: 'Dropcap' },
  //   result: (rte: any) => {
  //     var component = editor.getSelected();

  //     if (component.is('text') && component.getClasses().includes('dropCaps')) {
  //       component.replaceWith(`${component.get('content')}`);
  //     } else {
  //       var range = rte.selection().getRangeAt(0);

  //       var container = range.commonAncestorContainer;

  //       if (container.nodeType == 3) container = container.parentNode;

  //       if (container.nodeName == 'SPAN' && container.classList.contains('dropCaps')) {
  //         var parent = container.parentNode;
  //         var content = document.createTextNode(container.innerHTML);

  //         // insert all our children before ourselves.
  //         parent.insertBefore(content, container);

  //         parent.removeChild(container);
  //       } else {
  //         rte.insertHTML(`<span class="dropCaps">${rte.selection()}</span>`);
  //       }
  //     }
  //   }
  // });

  // editor.RichTextEditor.add('superscript', {
  //   icon: '<b>S<sup>s</sup></b>',
  //   attributes: { title: 'Superscript' },
  //   result: (rte: any) => rte.exec('superscript')
  // });

  // editor.RichTextEditor.add('subscript', {
  //   icon: '<b>S<sub>s</sub></b>',
  //   attributes: { title: 'Subscript' },
  //   result: (rte: any) => rte.exec('subscript')
  // });

  // editor.RichTextEditor.add('hyperlink', {
  //   icon: '&#128279;',
  //   attributes: { title: 'Hyperlink' },
  //   result: (rte: any) => {
  //     var component = editor.getSelected();

  //     if (component.is('link')) {
  //       component.replaceWith(`${component.get('content')}`);
  //     } else {
  //       var range = rte.selection().getRangeAt(0);

  //       var container = range.commonAncestorContainer;
  //       if (container.nodeType == 3) container = container.parentNode;

  //       if (container.nodeName === 'A') {
  //         var sel = rte.selection();
  //         sel.removeAllRanges();
  //         range = document.createRange();
  //         range.selectNodeContents(container);
  //         sel.addRange(range);
  //         rte.exec('unlink');
  //       } else {
  //         var url = window.prompt('Enter the URL to link to:');
  //         if (url) rte.insertHTML(`<a class="link" href="${url}">${rte.selection()}</a>`);
  //       }
  //     }
  //   }
  // });

  // editor.RichTextEditor.add('indent', {
  //   icon: '&#8594;',
  //   attributes: { title: 'Indent' },
  //   result: (rte: any) => rte.exec('indent')
  // });

  // editor.RichTextEditor.add('outdent', {
  //   icon: '&#8592;',
  //   attributes: { title: 'Outdent' },
  //   result: (rte: any) => rte.exec('outdent')
  // });

  // editor.RichTextEditor.add('orderedList', {
  //   icon: '1.',
  //   attributes: { title: 'Ordered List' },
  //   result: (rte: any) => rte.exec('insertOrderedList')
  // });

  // editor.RichTextEditor.add('unorderedList', {
  //   icon: '&#8226;',
  //   attributes: { title: 'Unordered List' },
  //   result: (rte: any) => rte.exec('insertUnorderedList')
  // });
};
