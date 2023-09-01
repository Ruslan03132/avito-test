import { GameCard } from "../GameCard/GameCard";
import { Col, Row } from "antd";
import styles from "./index.module.css";

export function GamesLayout({ data }) {
    return (
        <Row gutter={[18, 18]} justify='space-between'>
            {data.map((value) => {
                return (
                    <Col
                        key={value.id}
                        xs={{ span: 24 }}
                        sm={{ span: 12 }}
                        md={{ span: 8 }}
                        lg={{ span: 8 }}
                        xl={{ span: 6 }}
                        xxl={{ span: 6 }}
                    >
                        <GameCard book={value}></GameCard>
                    </Col>
                );
            })}
        </Row>
    );
}
