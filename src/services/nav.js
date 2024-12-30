import { request } from 'umi';

/**
 * 分页获取网址导航
 */
function getNavByPage(params) {
  return request('/api/nav', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/**
 * 分页获取网址导航标签
 */
function getNavTagByPage(params) {
  return request('/api/nav/tag', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/**
 * 分页获取网址导航二级标签
 */
function getNavSubTagByPage(params) {
  return request('/api/nav/subTag', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/**
 * 根据 id 获取网址导航详情
 */
function getNavById(navId) {
  return request(`/api/nav/${navId}`, {
    method: 'GET',
  });
}

/**
 * 新增网址导航
 */
function addNav(newNavInfo) {
  return request('/api/nav', {
    method: 'POST',
    data: newNavInfo,
  });
}

/**
 * 根据 id 删除网址导航
 */

function deleteNav(navId) {
  return request(`/api/nav/${navId}`, {
    method: 'DELETE',
  });
}

/**
 * 根据 id 编辑网址导航
 */
function editNav(navId, newNavInfo) {
  return request(`/api/nav/${navId}`, {
    method: 'PATCH',
    data: newNavInfo,
  });
}

export default {
  getNavByPage,
  getNavTagByPage,
  getNavSubTagByPage,
  getNavById,
  addNav,
  deleteNav,
  editNav,
};
