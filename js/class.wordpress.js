// todo: juiste thumbnailformaat binnen WP maken


function Wordpress(api_url) {
    this.api_url = api_url;
    this.target = '#content';
    this.api = function(url, callback, target) {
        this.target = target;
        $('.page').removeClass('in-transit');
        if($('#'+target).length<1) {
            win.log('Quering Wordpress api');
            var temp_element = $('#'+target+'-temp');
            if(temp_element.length<1) $('body').append('<section class="page wordpress in-transit" id="'+target+'-temp"></section>');
            else temp_element.html('').addClass('in-transit');
            callback = 'wp.interpret';
            if(url.indexOf('?')==-1) query = url+'?json=true&count=100&callback='+callback;
            else query = url+'&json=true&count=100&callback='+callback;
            var script = document.createElement('script');
            script.setAttribute('src', query);
            script.setAttribute('type', 'text/javascript');
            document.getElementsByTagName('body')[0].appendChild(script);
        }
    }
    this.interpret = function(data) {
        if(data.posts!=undefined)
            type = 'posts';
        $('.page').removeClass('in-transit');
        if(type=='posts') this.interpretPosts(data);
    }
    this.interpretPosts = function(data) {
        html = '';
        rest = 3-data.posts.length%3;
        if(rest!=0) for(i=0;i<rest;i++) html += '<div class="post-thumbnail"></div>';
        for(i=0;i<data.posts.length;i++) {
            post = data.posts[i];
            thumbnail = false;
            for(j=0;j<post.attachments.length&&thumbnail==false;j++) {
                //if(post.attachments[j].images['post-thumbnail'].url==post.thumbnail)
                    //thumbnail = post.attachments[j].images.medium.url;
            }
            if(thumbnail==false) thumbnail = post.thumbnail;
            
            html += '<a href="'+post.url+'" class="post-thumbnail" target="_blank" style="background-image: url(\''+thumbnail+'\');"><span class="title">'+post.title+'</span></a>';
        }
        $('#'+this.target+'-temp').html(html).attr('id', this.target).addClass('active');
        
        
        
    }
}