import { useCallback, useEffect } from "react";
import { Game } from "./Game";
import { Col, Row } from "antd";

export function GamesLayout({ data }) {
  console.log(data);


 
  return (
    <Row gutter = {[16, 16]}>
      {data.map((value) => {

        return <Col span ={8}><Game book={value} key={value.id}></Game></Col>
      })}
    </Row>
  );
}
