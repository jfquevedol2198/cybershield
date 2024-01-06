import dayjs from "dayjs";
import _ from "lodash";

export const parseShops = (data) =>
  data
    .filter((shop) => shop.risk_score !== null)
    .map((shop) => ({
      id: shop.id,
      cells: (shop.cells || []).length,
      name: shop.name_ || "",
      description: shop.description || "",
      riskScore: parseFloat(shop.risk_score || "0"),
      location: shop.location || "",
      assets: (shop.cells || []).reduce(
        (sum, cell) => sum + (cell.assets || 0),
        0
      ),
    }));

export const parseCellsOfShop = (data) =>
  data
    .filter((cell) => cell.name !== null)
    .map((cell) => ({
      shopId: cell.shop_id,
      id: cell.cell_id,
      name: cell.cell_name,
      description: cell.description,
      location: cell.location,
      riskScore: parseFloat(cell.risk_score || "0"),
      assets: cell.asset_count,
    }));

export const parseAssets = (data) =>
  data.map((asset) => ({
    assetId: asset.id,
    name: asset.name,
    type: asset.type,
    risk: parseFloat(asset.riskScore) * 100,
    mac: _.get(asset, "interfaces[0].mac") || "-",
    ip: _.get(asset, "interfaces[0].ip") || "-",
    cell: _.get(asset, "level2[0].name") || "-",
    shop: _.get(asset, "level2[0].name.level1.name") || "-",
    vendor: asset.vendorName,
    lastSeenAt: dayjs(asset.firstSeen).format("DD MMM YYYY | HH:mm:ss"),
    location: asset.location || "-",
    state: asset.state,
    firmware: asset.firmwareVersion,
    model: asset.modelName,
    pluginName: "",
    edr: "",
    isCertain: asset.isCertain || false,
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
