import {Button} from "antd";

export default function Home() {
  return (
      <>
          <div className="text-center flex-row">
              <div className="text-5xl ">
                  Hello there.
              </div>
              <Button>This is a button from antd!</Button>
          </div>
      </>
  );
}
