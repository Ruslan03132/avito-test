import { Button, ConfigProvider, Space } from "antd";
import { GamesLayout } from "./GamesLayout";

function App() {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#00b96b",
                        borderRadius: 2,
                        colorBgContainer: "#f6ffed",
                    },
                }}
            >
            </ConfigProvider>

            <a href = "/games">GAMES</a>
            <Button>click</Button>
            <GamesLayout>
              
            </GamesLayout>
        </>
    );
}

export default App;
