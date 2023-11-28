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
