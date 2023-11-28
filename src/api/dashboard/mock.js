import _ from "lodash";

import alertsPage0Json from "../__mock__/alerts_page0.json";
import alertsPage1Json from "../__mock__/alerts_page1.json";
import alertsPage2Json from "../__mock__/alerts_page2.json";
import assetsJson from "../__mock__/assets.json";
import insightsJson from "../__mock__/insights.json";
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

export function mockGetAlerts(mock) {
  mock.onPost("/alerts").reply(({ data }) => {
    const { page = 0 } = JSON.parse(data || "{}");
    const alerts =
      page === 0
        ? alertsPage0Json
        : page === 1
        ? alertsPage1Json
        : alertsPage2Json;

    return [
      200,
      {
        data: {
          ...alerts,
          alerts: alerts.alerts.map((alert) => {
            const asset = _.find(
              assetsJson.assets,
              (asset) => asset.id === alert.destinationAssetId
            );
            return {
              ...alert,
              assetName: _.get(asset, "name") || "-",
              cell: _.get(asset, "level2[0].name"),
            };
          }),
        },
      },
    ];
  });
}

export function mockGetInsights(mock) {
  mock.onGet("/insights").reply(200, { data: insightsJson });
}
