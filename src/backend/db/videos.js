/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */
import { v4 as uuid } from "uuid";

export const videos = [
  {
    _id: uuid(),
    title: "React crash course",
    video: "w7ejDZ8SWv8",
    views: 800000,
    creator: "FCC",
    category: "React",
    uploadDate: new Date(2018, 11, 24, 10, 33, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: uuid(),
    title: "HTML and CSS full course",
    video: "cyuzt1Dp8X8",
    views: 700000,
    creator: "Brocode",
    category: "HTML",
    uploadDate: new Date(2019, 1, 4, 10, 13, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: uuid(),
    title: "NodeJS Beginner's Guide",
    video: "ENrzD9HAZK4",
    views: 100000,
    creator: "Fireship",
    category: "NodeJS",
    uploadDate: new Date(2016, 1, 24, 11, 13, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: uuid(),
    title: "Advance React patterns",
    video: "MfIoAG3e7p4",
    views: 200000,
    creator: "codedamn",
    category: "React",
    uploadDate: new Date(2020, 4, 21, 12, 13, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: uuid(),
    title: "HTML Important Concepts",
    video: "HJ0-fUJ-2F0",
    views: 200000,
    creator: "KP",
    category: "HTML",
    uploadDate: new Date(2019, 10, 29, 1, 13, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: uuid(),
    title: "What is JS ?",
    video: "OSWppEa2Zac",
    views: 200000,
    creator: "WP",
    category: "Javascript",
    uploadDate: new Date(2014, 1, 24, 10, 13, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: uuid(),
    title: "MongoDB in 30 minutes",
    video: "pWbMrx5rVBE",
    views: 200000,
    creator: "Traversy Media",
    category: "MongoDB",
    uploadDate: new Date(2022, 1, 24, 10, 13, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: uuid(),
    title: "What is event loop ?",
    video: "8aGhZQkoFbQ",
    views: 3000000,
    creator: "JSConf",
    category: "Javascript",
    uploadDate: new Date(2018, 8, 20, 10, 13, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: uuid(),
    title: "MongoDB in 100sec",
    video: "-bt_y4Loofg",
    views: 200000,
    creator: "Fireship",
    category: "MongoDB",
    uploadDate: new Date(2016, 6, 2, 2, 30, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: uuid(),
    title: "NodeJS full course",
    video: "Oe421EPjeBE",
    views: 300000,
    creator: "FCC",
    category: "NodeJS",
    uploadDate: new Date(2022, 3, 27, 5, 13, 30, 0),
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
];
