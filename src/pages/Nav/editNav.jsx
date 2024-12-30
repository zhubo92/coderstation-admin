import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavForm from './components/navForm';
import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

// 请求方法
import NavController from '@/services/nav';

function EditNav() {
  const { id } = useParams(); // 获取可能传递过来的 id
  const [navInfo, setNavInfo] = useState(null);
  const navigate = useNavigate();

  // 根据传递过来的 id 获取详情
  useEffect(() => {
    async function fetchData() {
      const { data } = await NavController.getNavById(id);
      setNavInfo(data);
    }
    fetchData();
  }, []);

  /**
   * 修改
   */
  function submitHandle(navDesc) {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    NavController.editNav(id, {
      navTitle: navInfo.navTitle,
      navTag: navInfo.navTag,
      navType: navInfo.navType,
      navDesc,
      navLink: navInfo.navLink,
      navLogo: navInfo.navLogo,
      navRemark: navInfo.navRemark,
    });
    // 跳转回首页
    navigate('/nav/navList');
    message.success('信息修改成功');
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 800 }}>
        <NavForm
          type="edit"
          submitHandle={submitHandle}
          navInfo={navInfo}
          setNavInfo={setNavInfo}
        />
      </div>
    </PageContainer>
  );
}

export default EditNav;
