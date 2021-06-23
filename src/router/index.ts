import { Store } from "pullstate";

type RouterStoreState = {
  currentRoute:
    | "/login"
    | "/home"
    | "/home/organization-glossaries-manager"
    | "/home/public-glossaries-manager";
};

export const RouterStore = new Store<RouterStoreState>({
  currentRoute: "/login",
});
