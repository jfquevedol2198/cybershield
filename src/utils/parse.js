import { normalizeString } from "./common";

export const parseShops = (data) =>
  data
    .filter((shop) => shop.risk_score !== null)
    .map((shop) => ({
      ...shop,
      risk_score: parseFloat(shop.risk_score || "0"),
      assets: shop.cells?.reduce((acc, cell) => acc + cell.assets, 0),
    }));

export const parseCells = (data) =>
  data
    .filter((cell) => cell.name !== null)
    .map((cell) => ({
      ...cell,
      risk_score: parseFloat(cell.risk_score || "0"),
    }));

export const parseAssets = (data) =>
  data.map((asset) => ({
    ...asset,
    risk_score: parseFloat(asset.risk_score || "0"),
  }));

export const groupByKey = (data, key, formatKeyFn = (key) => key) => {
  const group = data.reduce((_group, value) => {
    const formattedKey = formatKeyFn(value[key]);
    if (Object.keys(_group).indexOf(formattedKey) !== -1) {
      _group[formattedKey]++;
    } else {
      _group[formattedKey] = 1;
    }
    return _group;
  }, {});
  return Object.keys(group)
    .map((formattedKey) => ({
      type: formattedKey,
      count: group[formattedKey],
      percent: Math.floor((group[formattedKey] * 100) / data.length),
    }))
    .sort((b, a) => a.count - b.count)
    .slice(0, 6);
};

export const parseCognitoUsers = (data) =>
  data.map((user) => ({
    id: user.id,
    username: user.user_name,
    status: true,
    email: user.email,
    isMfaEnabled: user.enable_multifactor_authn,
    isServiceNowEnabled: true,
    phone: user.phone,
    title: user.title,
    firstName: user.first_name,
    lastName: user.last_name,
    middleName: user.middle_name,
    manager: user.manager,
    country: user.country,
    state: user.state,
    city: user.city,
    zip: user.zip,
  }));

export const parseVulnerabilities = (data) =>
  data.map((vul) => ({
    ...vul,
  }));

export const parseAlerts = (data) =>
  data.map((d) => ({
    ...d,
    category_name: normalizeString(d.category_name),
    type_name: normalizeString(d.type_name),
    subtype_name: normalizeString(d.subtype_name),
    severity: parseFloat(d.severity || "0"),
  }));

export const parseIncident = (data) =>
  data.map((d) => ({
    ...d,
    severity: parseFloat(d.severity) / 10,
  }));
