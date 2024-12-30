import { Button, Form, Input, Upload, Image, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { typeOptionCreator } from '@/utils/tool';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/zh-cn';
import { Editor } from '@toast-ui/react-editor';

function NavForm({ type, submitHandle, navInfo, setNavInfo }) {
  const formRef = useRef();
  const editorRef = useRef();
  const [firstIn, setFirstIn] = useState(true);

  if (type === 'edit') {
    if (formRef.current && firstIn) {
      setFirstIn(false);
      console.log(navInfo?.navDesc, 'navInfo?.navDesc');
      editorRef.current.getInstance().setHTML(navInfo?.navDesc || "");
    }
    if (formRef.current) {
      formRef.current.setFieldsValue(navInfo);
    }
  }

  // logo
  let navLogoPreview = null;
  if (type === 'edit') {
    navLogoPreview = (
      <Form.Item label="当前logo" name="navLogoPreview">
        <Image src={navInfo?.navLogo} width={100} />
      </Form.Item>
    );
  }

  // 用户填写内容时更新表单控件内容
  function updateInfo(newInfo, key) {
    const newNavInfo = { ...navInfo };
    if (typeof newInfo === 'string') {
      newNavInfo[key] = newInfo.trim();
    } else {
      newNavInfo[key] = newInfo;
    }
    setNavInfo(newNavInfo);
  }

  function addHandle() {
    const content = editorRef.current.getInstance().getHTML();
    submitHandle(content);
  }

  function handleTypeChange(value) {
    updateInfo(value, 'navTag');
  }

  const tagList = [
    { _id: "h3", typeName: "标签" },
    { _id: "sub", typeName: "二级标签" },
    { _id: "a", typeName: "网址导航" },
  ]

  return (
    <Form
      name="basic"
      initialValues={navInfo}
      autoComplete="off"
      ref={formRef}
      onFinish={addHandle}
    >
      <Form.Item
        label="标题"
        name="navTitle"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input
          value={navInfo?.navTitle}
          onChange={(e) => updateInfo(e.target.value, 'navTitle')}
        />
      </Form.Item>

      <Form.Item
        label="类型"
        name="navTag"
        rules={[{ required: true, message: '请选择类型' }]}
      >
        <Select style={{ width: 200 }} onChange={handleTypeChange}>
          {typeOptionCreator(Select, tagList)}
        </Select>
      </Form.Item>

      <Form.Item
        label="所属上级标签名称"
        name="navType"
      >
        <Input
          value={navInfo?.navType}
          onChange={(e) => updateInfo(e.target.value, 'navType')}
        />
      </Form.Item>

      <Form.Item
        label="链接"
        name="navLink"
      >
        <Input
          value={navInfo?.navLink}
          onChange={(e) => updateInfo(e.target.value, 'navLink')}
        />
      </Form.Item>

      {navLogoPreview}

      <Form.Item label="logo" valuePropName="fileList">
        <Upload
          action="/api/upload"
          listType="picture-card"
          maxCount={1}
          onChange={(e) => {
            if (e.file.status === 'done') {
              // 说明上传已经完成
              const url = e.file.response.data;
              updateInfo(url, 'navLogo');
            }
          }}
        >
          <PlusOutlined />
        </Upload>
      </Form.Item>

      <Form.Item label="备注" name="navRemark">
        <Input
          value={navInfo?.navRemark}
          onChange={(e) => updateInfo(e.target.value, 'navRemark')}
        />
      </Form.Item>

      <Form.Item label="介绍" name="navDesc">
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          language="zh-CN"
          ref={editorRef}
        />
      </Form.Item>

      {/* 确认修改按钮 */}
      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === 'add' ? '确认新增' : '修改'}
        </Button>

        <Button type="link" htmlType="submit" className="resetBtn">
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NavForm;
