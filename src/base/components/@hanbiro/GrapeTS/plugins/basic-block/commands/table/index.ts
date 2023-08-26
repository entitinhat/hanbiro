export default (editor: any, opts: any) => {
  const cmd = editor.Commands;

  cmd.add('tlb-insert-row-above', (ed: any) => {
    const selected = ed.getSelected();

    if (selected.is('cell')) {
      const rowComponent = selected.parent();
      const rowIndex = rowComponent.collection.indexOf(rowComponent);
      const cells = rowComponent.components().length;
      const rowContainer = rowComponent.parent(); //thead, tbody, tfoot

      rowContainer.components().add(
        {
          type: 'row',
          components: [...Array(cells).keys()].map((i) => ({
            type: 'cell',
            //content: 'New Cell',
          })),
        },
        { at: rowIndex },
      );
    }
  });

  cmd.add('tlb-insert-row-below', (ed: any) => {
    const selected = ed.getSelected();

    if (selected.is('cell')) {
      const rowComponent = selected.parent();
      const rowIndex = rowComponent.collection.indexOf(rowComponent);
      const cells = rowComponent.components().length;
      const rowContainer = rowComponent.parent(); //thead, tbody, tfoot

      rowContainer.components().add(
        {
          type: 'row',
          components: [...Array(cells).keys()].map((i) => ({
            type: 'cell',
            //content: 'New Cell',
          })),
        },
        { at: rowIndex + 1 },
      );
    }
  });

  cmd.add('tlb-insert-col-left', (ed: any) => {
    const selected = ed.getSelected();

    if (selected.is('cell')) {
      const rowComponent = selected.parent();
      const rowContainer = rowComponent.parent(); //thead, tbody, tfoot
      const tableContainer = rowContainer.parent(); //table
      //selected column index
      const colIndex = rowComponent.components().indexOf(selected);
      //table
      tableContainer.components().forEach((rowCont: any) => {
        //thead, tbody
        rowCont.components().forEach((row: any) => {
          //tr
          row.components().add(
            //td
            {
              type: 'cell',
              //content: 'New Col',
            },
            { at: colIndex },
          );
        });
      });
    }
  });

  cmd.add('tlb-insert-col-right', (ed: any) => {
    const selected = ed.getSelected();

    if (selected.is('cell')) {
      const rowComponent = selected.parent();
      const rowContainer = rowComponent.parent(); //thead, tbody, tfoot
      const tableContainer = rowContainer.parent(); //table
      //selected column index
      const colIndex = rowComponent.components().indexOf(selected);
      //table
      tableContainer.components().forEach((rowCont: any) => {
        //thead, tbody
        rowCont.components().forEach((row: any) => {
          //tr
          row.components().add(
            //td
            {
              type: 'cell',
              //content: 'New Col',
            },
            { at: colIndex + 1 },
          );
        });
      });
    }
  });

  cmd.add('tlb-delete-row', (ed: any) => {
    const selected = ed.getSelected();

    if (selected.is('cell')) {
      const rowComponent = selected.parent();
      const rowContainer = rowComponent.parent(); //thead, tbody, tfoot
      rowContainer.components().remove(rowComponent);
    }
  });

  cmd.add('tlb-delete-column', (ed: any) => {
    const selected = ed.getSelected(); //td

    if (selected.is('cell')) {
      const rowComponent = selected.parent(); //tr
      const rowContainer = rowComponent.parent(); //thead, tbody, tfoot
      const tableContainer = rowContainer.parent(); //table
      //remove cells in column
      const colIndex = rowComponent.components().indexOf(selected);
      tableContainer.components().forEach((rowCont: any) => {
        rowCont.components().forEach((row: any) => {
          const colComp = row.getChildAt(colIndex);
          row.components().remove(colComp);
        });
      });
    }
  });
};
