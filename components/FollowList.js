import React from "react";
import { List, Button, Card } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();

  const onCancel = (id) => () => {
    dispatch({ type: UNFOLLOW_REQUEST, data: id });
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <ListWrapper
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <LoadMore>
          <Button>더 보기</Button>
        </LoadMore>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <ListItem>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </ListItem>
      )}
    />
  );
};

export default FollowList;

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

const ListWrapper = styled(List)`
  margin-bottom: 20px;
`;

const LoadMore = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const ListItem = styled(List.Item)`
  margin-top: 20;
`;
