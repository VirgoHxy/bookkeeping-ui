import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import { bold, green } from "picocolors";
import type { Plugin } from "vite";
dayjs.extend(duration);

export function viteBuildInfo(): Plugin {
  let config: { command: string };
  let startTime: Dayjs;
  let endTime: Dayjs;
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    buildStart() {
      if (config.command === "build") {
        startTime = dayjs(new Date());
      }
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(new Date());
        console.log(
          bold(
            green(
              `ðæ­åæåå®æï¼æ»ç¨æ¶${dayjs
                .duration(endTime.diff(startTime))
                .format("mmåssç§")}ï¼`
            )
          )
        );
      }
    }
  };
}
