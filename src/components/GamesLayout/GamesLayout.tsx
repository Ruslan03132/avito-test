import { GameCard } from "../GameCard/GameCard";
import { Col, Row } from "antd";
import styles from "./index.module.css";
import { IGamesListItem } from "../../toolkitRedux/toolkitSliceGamesList";

interface IGamesLayoutProps {
    data: IGamesListItem[];
}

export function GamesLayout( props : IGamesLayoutProps) {
    return (
        <Row gutter={[18, 18]} justify="space-between">
            {props.data.map((value: IGamesListItem) => {
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
                        <GameCard {...value}></GameCard>
                    </Col>
                );
            })}
        </Row>
    );
}
