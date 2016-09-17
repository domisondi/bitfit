/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var serverUrl = 'http://172.31.2.42/bitfit/server/';

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.authenticateUser();
    },
    viewPage: function(pageId) {
        $('.page').hide();
        $('#' + pageId).show();
    },
    authenticateUser: function() {
        $('.event.authenticating').css("display","inline-block");
        $.oauth2({
            auth_url: 'https://www.fitbit.com/oauth2/authorize',
            response_type: 'token',
            token_url: '',
            logout_url: '',
            client_id: '227Z6J',
            client_secret: '',
            redirect_uri: serverUrl + '?page=callback',
            other_params: {
                scope: 'activity',
                expires_in: 604800
            }
        }, function(token, response){
            $.urlParam = function(name, response){
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(response);
                return results[1] || 0;
            }
            var userId = $.urlParam('user_id', response);
            $('.event.authenticating').css("display","none");
            app.outputOurData(app.gatherOurData(token, userId));
            
        }, function(error, response){
            alert(response);
        });
    },
    gatherOurData: function(token, userId) {
        
        var output;
        $('.event.loading').css("display","inline-block");
        $.ajax({
            url: serverUrl + 'api/?request=items&access_token=' + token + '&user_id=' + userId,
            success: function(data) {
                data = "{\"status\":0,\"message\":\"\",\"collections\":{\"1\":{\"id\":\"1\",\"name\":\"Collection 1\",\"items\":{\"1\":{\"id\":\"1\",\"coll_id\":\"1\",\"name\":\"Test\",\"description\":\"\",\"nr_steps\":\"100\"},\"2\":{\"id\":\"2\",\"coll_id\":\"1\",\"name\":\"Test\",\"description\":\"\",\"nr_steps\":\"100\"},\"3\":{\"id\":\"3\",\"coll_id\":\"1\",\"name\":\"Asdf\",\"description\":\"\",\"nr_steps\":\"999\"},\"4\":{\"id\":\"4\",\"coll_id\":\"1\",\"name\":\"Objekt\",\"description\":\"\",\"nr_steps\":\"488\"},\"5\":{\"id\":\"5\",\"coll_id\":\"1\",\"name\":\"Objekt\",\"description\":\"\",\"nr_steps\":\"488\"},\"6\":{\"id\":\"6\",\"coll_id\":\"1\",\"name\":\"Item'%934\u00ae@\u2202#\u00c7[\",\"description\":\"\",\"nr_steps\":\"800\"},\"8\":{\"id\":\"8\",\"coll_id\":\"1\",\"name\":\"haha\",\"description\":\"\",\"nr_steps\":\"80\"},\"10\":{\"id\":\"10\",\"coll_id\":\"1\",\"name\":\"asdf\",\"description\":\"\",\"nr_steps\":\"8080\"},\"11\":{\"id\":\"11\",\"coll_id\":\"1\",\"name\":\"haha\",\"description\":\"\",\"nr_steps\":\"80\"},\"12\":{\"id\":\"12\",\"coll_id\":\"1\",\"name\":\"haha\",\"description\":\"\",\"nr_steps\":\"80\"},\"13\":{\"id\":\"13\",\"coll_id\":\"1\",\"name\":\"haha\",\"description\":\"\",\"nr_steps\":\"80\"}}},\"5\":{\"id\":\"5\",\"name\":\"Collection 2\",\"items\":{\"1\":{\"id\":\"1\",\"coll_id\":\"5\",\"name\":\"asdf\",\"description\":\"asdf\",\"nr_steps\":\"1000\"}}}}}");
                alert(data);
                output = data;

            }
        });
        $('.event.loading').css("display","none");
        return output;
    },
    
    outputOurData: function(data) {
        alert(data);
        $.each(data.collections, function(index, object) {$("#list").append("<a class='collection col-6' href='#'>" + object.name +"</a>")});
    }
};