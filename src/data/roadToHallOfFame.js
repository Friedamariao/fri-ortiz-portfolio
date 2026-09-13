// Data source for the "Road to Hall of Fame" module.
//
// Each entry is one node in the constellation. While a lab is "locked"
// it renders as a silhouette medal with no link and no download (no
// broken links, no unfinished content shown). To publish a lab:
//   1. Set status to "unlocked"
//   2. Fill in title, description and path (its future detail page)
//   3. Set pdfHref to that lab's individual report
//
// position.x / position.y are percentages (0-100) placing the node
// inside the constellation canvas on desktop. On mobile the nodes
// stack vertically instead, so position is ignored there.
//
// shortTitle is the compact label always shown on the node itself
// (e.g. "FPT 01") so the constellation stays visually even no matter
// how long the real title is. The full title only appears in the
// hover/focus tooltip and, later, on the lab's own detail page.
//
// iconPath is an optional SVG path (in a 48x66 viewBox, centered
// around the 24,18 medal circle) drawn in the medal once unlocked.
// Leave it unset to use the default star until each lab's topic is
// defined and a matching icon is designed.

export const roadToHallOfFameLabs = [
  {
    id: "lab-01",
    number: "01",
    title: "File path traversal, simple case.",
    shortTitle: "FPT 01",
    description: "Locked",
    status: "locked",
    path: null,
    pdfHref: null,
    pdfFilename: null,
    position: { x: 14, y: 62 },
    iconPath: null,
  },
  {
    id: "lab-02",
    number: "02",
    title:
      "File path traversal, traversal sequences blocked with absolute path bypass.",
    shortTitle: "FPT 02",
    description: "Locked",
    status: "locked",
    path: null,
    pdfHref: null,
    pdfFilename: null,
    position: { x: 25, y: 24 },
    iconPath: null,
  },
  {
    id: "lab-03",
    number: "03",
    title: "File path traversal, traversal sequences stripped non-recursively",
    shortTitle: "FPT 03",
    description: "Locked",
    status: "locked",
    path: null,
    pdfHref: null,
    pdfFilename: null,
    position: { x: 44, y: 12 },
    iconPath: null,
  },
  {
    id: "lab-04",
    number: "04",
    title:
      "File path traversal, traversal sequences stripped with superfluous URL-decode",
    shortTitle: "FPT 04",
    description: "Locked",
    status: "locked",
    path: null,
    pdfHref: null,
    pdfFilename: null,
    position: { x: 55, y: 50 },
    iconPath: null,
  },
  {
    id: "lab-05",
    number: "05",
    title: "File path traversal, validation of start of path",
    shortTitle: "FPT 05",
    description: "Locked.",
    status: "locked",
    path: null,
    pdfHref: null,
    pdfFilename: null,
    position: { x: 74, y: 60 },
    iconPath: null,
  },
  {
    id: "lab-06",
    number: "06",
    title:
      "File path traversal, validation of file extension with null byte bypass",
    shortTitle: "FPT 06",
    description: "Locked.",
    status: "locked",
    path: null,
    pdfHref: null,
    pdfFilename: null,
    position: { x: 92, y: 40 },
    iconPath: null,
  },
];