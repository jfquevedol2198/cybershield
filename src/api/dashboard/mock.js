import _ from "lodash";

import assetsJson from "../__mock__/assets.json";
import sitesJson from "../__mock__/sites.json";
import vulnerabilitiesJson from "../__mock__/vulnerabilities.json";

export function mockGetAssets(mock) {
  mock.onPost("/assets").reply(({ data }) => {
    const { cellId } = JSON.parse(data || "{}");
    if (!cellId) {
      return [200, { data: assetsJson }];
    }
    return [
      200,
      {
        data: _.get(assetsJson, "assets").filter((asset) =>
          _.find(_.get(asset, "level2"), (level2) => level2.id === cellId)
        ),
      },
    ];
  });
}

export function mockGetCells(mock) {
  mock.onPost("/cells").reply(({ data }) => {
    const { shopId } = JSON.parse(data || "{}");
    return [
      200,
      {
        data: _.map(
          _.get(
            _.find(
              _.get(sitesJson, "sites[0].level1"),
              (shop) => shop.id === shopId || !shopId
            ),
            "level2"
          ),
          (cell) => ({
            ...cell,
            assets: _.get(assetsJson, "assets").filter((asset) =>
              _.find(_.get(asset, "level2"), (level2) => level2.id === cell.id)
            ).length,
          })
        ),
      },
    ];
  });
}

export function mockGetShops(mock) {
  mock.onPost("/shops").reply(() => {
    return [
      200,
      {
        data: _.map(_.get(sitesJson, "sites[0].level1"), (shop) => ({
          ...shop,
          assets: _.get(assetsJson, "assets").filter(
            (asset) =>
              _.filter(
                _.get(asset, "level2"),
                (level2) => _.get(level2, "level1.id") === shop.id
              ).length
          ).length,
        })),
      },
    ];
  });
}

export function mockGetVulnerabilities(mock) {
  mock.onGet("/vulnerabilities").reply(200, { data: vulnerabilitiesJson });
}
