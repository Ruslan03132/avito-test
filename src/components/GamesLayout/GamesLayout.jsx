import { GameCard } from "../GameCard/GameCard";
import { Col, Row } from "antd";
import styles from "./index.module.css";

export function GamesLayout({ data }) {
    return (
        <>
            <Row gutter={[16, 16]}>
                {data.map((value) => {
                    return (
                        <Col span={8} key={value.id}>
                            <GameCard book={value}></GameCard>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}
