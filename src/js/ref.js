(function($) {
  'use strict';

  var storageItemName = 'jibrelRefId';
  var refidParamName = 'refid=';

  $(document).ready(function() {
    setRefId();
  });

  function getRefIdFromUrl() {
    // Working only for one param
    return window.location.search.split(refidParamName)[1];
  }

  function setRefId() {
    var refid = getRefIdFromUrl();

    if (!refid) {
      return;
    }

    window.localStorage.setItem(storageItemName, refid);
  }

  function getRefId() {
    var refid = getRefIdFromUrl();

    if (refid) {
      return refid;
    }

    return window.localStorage.getItem(storageItemName);
  }

  window.getRefId = getRefId;
})(jQuery);