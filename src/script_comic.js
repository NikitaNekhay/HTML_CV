"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
function validateData(str) {
    try {
        var newUrl = new URL(str.toString());
        var pattern = new RegExp('^([a-zA-Z]+:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i');
        return (newUrl.protocol === 'http:' || newUrl.protocol === 'https:') && pattern.test(str.toString());
    }
    catch (err) {
        return false;
    }
}
function getComic() {
    return __awaiter(this, void 0, void 0, function () {
        var varja, var_ID, comic_obj_json, comic_obj, dataUpload, templateDate, ComicSpace, p, image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://fwd.innopolis.app/api/hw2?email=n.niakhai@innopolis.university')];
                case 1:
                    varja = _a.sent();
                    return [4 /*yield*/, varja.json()];
                case 2:
                    var_ID = _a.sent();
                    if (!validateData(var_ID) || var_ID === null) {
                        alert('Invalid source!');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch("https://getxkcd.vercel.app/api/comic?num=" + var_ID)];
                case 3:
                    comic_obj_json = _a.sent();
                    return [4 /*yield*/, comic_obj_json.json()];
                case 4:
                    comic_obj = _a.sent();
                    dataUpload = new Date(comic_obj.month + "/" + comic_obj.day + "/" + comic_obj.year);
                    templateDate = function (date) { return date.toLocaleDateString("en-GB", {
                        era: "long"
                    }); };
                    ComicSpace = document.getElementById('.XKCD_comic') //
                    ;
                    p = document.createElement("p");
                    p.textContent = "\n\nDescription of comic:\n".concat(comic_obj.transcript, "\n\nData of comic: ").concat(templateDate(dataUpload), "\n\n");
                    ComicSpace === null || ComicSpace === void 0 ? void 0 : ComicSpace.appendChild(p);
                    image = document.querySelector('#XKCD_comic_image');
                    if (image != null) {
                        image.setAttribute('title', comic_obj.title);
                        image.setAttribute('src', comic_obj.img);
                        image.setAttribute('alt', comic_obj.alt);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var comic = document.querySelector('#NN_button');
if (comic !== null)
    comic.addEventListener('click', function (e) { return getComic(); });
