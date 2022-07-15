export const CREATE_TAG = "CREATE_TAG";
export const CREATE_TAG_RESPONSE = "CREATE_TAG_RESPONSE";
export const EDIT_TAG = "EDIT_TAG";
export const EDIT_TAG_RESPONSE = "EDIT_TAG_RESPONSE";
export const DELETE_TAG = "DELETE_TAG";
export const DELETE_TAG_RESPONSE = "DELETE_TAG_RESPONSE";
export const VIEW_TAG = "VIEW_TAG";
export const VIEW_TAG_RESPONSE = "VIEW_TAG_RESPONSE";
export const VIEW_TAGS = "VIEW_TAGS";
export const VIEW_TAGS_RESPONSE = "VIEW_TAGS_RESPONSE";

export const createTag = (tagData) => ({
  type: CREATE_TAG,
  tagData,
});

export const createTagResponse = (response) => ({
  type: CREATE_TAG_RESPONSE,
  response,
});

export const editTag = (id, tagData) => ({
  type: EDIT_TAG,
  id,
  tagData,
});

export const editTagResponse = (response) => ({
  type: EDIT_TAG_RESPONSE,
  response,
});

export const deleteTag = (id) => ({
  type: DELETE_TAG,
  id,
});

export const deleteTagResponse = (response) => ({
  type: DELETE_TAG_RESPONSE,
  response,
});

export const viewTags = () => ({
  type: VIEW_TAGS,
});

export const viewTagsResponse = (response) => ({
  type: VIEW_TAGS_RESPONSE,
  response,
});

export const viewTag = (id) => ({
  type: VIEW_TAG,
  id,
});

export const viewTagResponse = (response) => ({
  type: VIEW_TAG_RESPONSE,
  response,
});
