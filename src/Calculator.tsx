import { Grid, Input, Slider, Text, Card, Radio, Spacer } from "@geist-ui/core";
import { useEffect, useState } from "react";

const Calculator = () => {
  const [longOrShort, setLongOrShort] = useState<"long" | "short">("long");
  const [maxLoss, setMaxLoss] = useState<number>();
  const [enterPrice, setEnterPrice] = useState<number>();
  const [exitPrice, setExitPrice] = useState<number>();
  const [leverage, setLeverage] = useState<number>(1);
  const [security, setSecurity] = useState<number>(0);

  useEffect(() => {
    if (maxLoss && enterPrice && exitPrice) {
      let sl;
      if (longOrShort === "long") {
        sl = (enterPrice - exitPrice) / enterPrice;
      } else {
        sl = (exitPrice - enterPrice) / enterPrice;
      }
      let value = maxLoss / sl;
      let security = Math.round((value / leverage) * 100) / 100;
      setSecurity(security);
    }
  }, [longOrShort, maxLoss, enterPrice, exitPrice, leverage]);

  return (
    <div>
      <Grid.Container gap={1} justify="center">
        <Grid xs={12} padding={2} direction="column">
          多單 / 空單
          <Spacer h={0.5} />
          <Radio.Group value="1" useRow>
            <Radio value="1" onChange={() => setLongOrShort("long")}>
              做多
            </Radio>
            <Radio value="2" onChange={() => setLongOrShort("short")}>
              做空
            </Radio>
          </Radio.Group>
        </Grid>
        <Grid xs={12} padding={2}>
          <Input
            labelRight="usdt"
            onChange={(d) => setMaxLoss(Number(d.target.value))}
          >
            最高承受風險
          </Input>
        </Grid>
        <Grid xs={12} padding={2}>
          <Input
            labelRight="usdt"
            onChange={(d) => setEnterPrice(Number(d.target.value))}
          >
            入場點位
          </Input>
        </Grid>
        <Grid xs={12} padding={2}>
          <Input
            labelRight="usdt"
            onChange={(d) => setExitPrice(Number(d.target.value))}
          >
            止損點位
          </Input>
        </Grid>
        <Grid xs={24} padding={2} direction="column">
          <Text>槓桿倍數</Text>
          <Slider
            initialValue={1}
            min={1}
            max={125}
            onChange={(d) => setLeverage(d)}
          />
        </Grid>
        <Grid xs={24} padding={2}>
          <Card>
            <p>保證金：{security} usdt</p>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Calculator;
