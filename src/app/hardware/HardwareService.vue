/*eslint no-unused-vars disable */
<script>
import Vue from "vue";

export default {
  methods: {
    getHardwares: function() {
      return axios.get("/api/assets/hardwarelist").then(res => {
        var _items = [];
        for (var item of res.data.rows) {
          if (!item.assigned_to) {
            var _assigned_to = {
              name: " "
            };
            item.assigned_to = _assigned_to;
          }
          if (!item.location) {
            var _location = {
              name: " "
            };
            item.location = _location;
            item.warn = true;
          }
          _items.push(item);
        }
        return _items;
      });
    },
    checkInhardware: function(assetId) {
      return Vue.http
        .post("/api/assets/checkinhardware", { assetId: assetId })
        .then(res => {
          return res.body;
        });
    },
    checkOuthardware: function(assetId, username) {
      console.log(username);
      return Vue.http
        .post("/api/assets/checkouthardware", {
          assetId: assetId,
          username: username
        })
        .then(res => {
          return res.body;
        });
    },
    getConsumables: function() {
      return Vue.http.get("/api/assets/consumablelist").then(res => {
        console.log(res);
        return res.body;
      });
    },
    takeConsumable: function(asset) {
      console.log(asset);
      // const id = assetId.id
      return Vue.http
        .post("/api/assets/takeconsumable", { asset: asset })
        .then(res => {
          console.log(res);
          return res.body;
        });
    },
    getEmployees: function() {
      // console.log('getting users...')
      return Vue.http.get("/api/employeelist/").then(res => {
        // console.log('response is: ', res.body)
        return res.body;
      });
    }
  }
};
</script>

