/**
 * pplayer.js
 *
 * Author: Victor Klos
 */

/*
@startuml common_classes.png

class Item {
    String title
    String artist
    String url
}
class AudioItem {
    String album;
    Base64String cover;
}
class VideoItem {
    Base64String thumbnail;
}

Item <|-- AudioItem
Item <|-- VideoItem

@enduml
*/


'use strict'


/**
 * Contains our killer demo app.
 *
 * @namespace partyplayer
 * @author Victor Klos, Martin Prins, Arno Pont, Daryll Rinzema
 */
var partyplayer = partyplayer || {};


/**
 * Constructor for Item, never used directly.
 *
 * @constructor
 * @param title String representing the title of a media item
 * @param artist String representing the artist
 * @param url String representing the URL from which it can be retrieved
 */
partyplayer._Item = function(title, artist, url)
{
    this._class = 'base';
    this.title = title;
    this.artist = artist;
    this.url = url;
    this.isVideoItem = function() { return this._class === 'VideoItem'; };
    this.isAudioItem = function() { return this._class === 'AudioItem'; };
}


/**
 * Constructor for AudioItem.
 *
 * @constructor
 * @param title
 * @param artist
 * @param url
 * @param album String with name of album
 * @param cover Base64 representation of album cover
 * @augments partyplayer._Item
 * @example
 *   var a = new AudioItem(
 *       'Nederwiet', 'Doe Maar', 'Skunk',
 *       'http://xyz/bh.mp3', 'BASE64STRINGLIKESO=');
 *
 *   a.isAudioItem();       // true
 *   a.isVideoItem();       // false
 */
partyplayer.AudioItem = function(title, artist, url, album, cover)
{
    this._class = 'AudioItem';
    this.title = title;
    this.artist = artist;
    this.url = url;
    this.album = album;
    this.cover = cover;
}
partyplayer.AudioItem.prototype = new partyplayer._Item;


/**
 * Constructor for VideoItem.
 *
 * @constructor
 * @param title
 * @param artist
 * @param url
 * @param thumbnail Base64 representation of a thumbnail or DVD cover
 * @augments partyplayer._Item
 * @example
 *   var v = new VideoItem(
 *       'Poker Face', 'Lady Gaga', 'http://www.youtube.com/watch?v=bESGLojNYSo',
 *       'ANOTHERBASE64STRINGLIKESO=');
 *
 *   v.isAudioItem();       // false
 *   v.isVideoItem();       // true
 */
partyplayer.VideoItem = function(title, artist, url, thumbnail)
{
    this._class = 'VideoItem';
    this.title = title;
    this.artist = artist;
    this.url = url;
    this.thumbnail = thumbnail;
}
partyplayer.VideoItem.prototype = new partyplayer._Item;
