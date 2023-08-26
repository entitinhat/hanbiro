export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  domc.addType('image-on-top', {
    //extend: 'image',
    model: {
      defaults: {
        // prop1: 'value1',
        // prop2: 'value2',
        content: `<div class="el-X">
        <div class="el-Y el-A">Element A</div>
        <div class="el-Y el-B">Element B</div>
        <div class="el-Y el-C">Element C</div>
      </div>`
      }
    }
  });
};
