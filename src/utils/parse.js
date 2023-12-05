import dayjs from "dayjs";
import _ from "lodash";

export const parseAssets = (data) =>
  data.map((asset) => ({
    assetId: asset.id,
    name: asset.name,
    type: asset.type,
    risk: parseFloat(asset.riskScore) * 100,
    mac: _.get(asset, "interfaces[0].mac") || "-",
    ip: _.get(asset, "interfaces[0].ip") || "-",
    cell: _.get(asset, "level2[0].name") || "-",
    vendor: asset.vendorName,
    lastSeenAt: dayjs(asset.firstSeen).format("DD MMM YYYY | HH:mm:ss"),
    location: asset.location || "-",
  }));

export const parseAlerts = (data) =>
  data.map((alert) => ({
    alertId: alert.id,
    category: _.get(alert, "subCategory.category.name") || "-",
    type: _.get(alert, "subCategory.type.name") || "-",
    subtype: _.get(alert, "subCategory.subtype.name") || "-",
    severity: _.get(alert, "severity") * 10 || 0,
    status: _.get(alert, "status") || "-",
    alertTime: _.get(alert, "createdAt"),
    assetName: _.get(alert, "assetName") || "-",
    ip: _.get(alert, "destinationAssetIp") || "-",
    cell: _.get(alert, "cell"),
    shop: _.get(alert, "shop"),
    updatedAt: _.get(alert, "updatedAt"),
    assignee: _.get(alert, "assigneeUserId") || "-",
  }));

export const groupByKey = (data, key) => {
  const group = data.reduce((_group, value) => {
    if (Object.keys(_group).indexOf(value[key]) !== -1) {
      _group[value[key]]++;
    } else {
      _group[value[key]] = 1;
    }
    return _group;
  }, {});
  return Object.keys(group)
    .map((value) => ({
      type: value,
      count: group[value],
      percent: Math.floor((group[value] * 100) / data.length),
    }))
    .sort((b, a) => a.count - b.count)
    .slice(0, 6);
};
