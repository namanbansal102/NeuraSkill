    // SPDX-License-Identifier: MIT
    pragma solidity >=0.7.0;
    pragma experimental ABIEncoderV2;
    contract compete {
        struct pair{
            uint project_id;
            address payable[]  upvoters;// this are the address of upvoters 
            uint upvotes;
        }
     struct hacakthon {
        uint hack_id;
        address hack_owner;
        string title;
        string img_url;
        string desc;
        uint prizePool;
        uint nAwards;
        uint[] prize_pool_array;
        string st_date;
        string end_date;
        string mode; 
        uint funding;
    }
    struct build {
        address payable build_owner;
        uint project_id;
        uint upvotes;
        string name;
        string techStack;
        string desc;
        string video_url;
        string github_id;
        address[] team;// first is the owner of the team
    }
    mapping (address => uint[]) userbuilds_map;
    // mapping(hack_id=>address[]) 
    event deposit(address sender,uint amount);
    event transferPrize(address sender,uint amount);
    
    event transferFund(address sender,uint amount);
    mapping (uint =>pair[]) hack_upvotes_map;
    uint hack_id=0;
    uint project_id=0;
    hacakthon[] public hackathons_arr;// we have created a hacakthon array
    mapping (uint=> uint[]) hack_map;// this contains the hackathon id
    build[] public build_arr;

        function registerHackathon(string memory _title,string memory _img_url,string memory _desc,uint  _prizePool,string memory _st_date,string memory _end_date,string memory _mode,uint _nAwards,uint[] memory _prizePoolArray)  public {
            hackathons_arr.push(hacakthon(hack_id,msg.sender,_title,_img_url,_desc,_prizePool,_nAwards,_prizePoolArray,_st_date,_end_date,_mode,0));
            hack_id++;
        }

        function allHackathons()public view returns(hacakthon[] memory){
            return hackathons_arr;
        }

        function createBuild(string memory _name,string memory _techStack,string memory _desc,string memory _video_url,string  memory _github_id,address[] memory _addresses) public  {
            build_arr[project_id]=build(
                payable(msg.sender),
            project_id,
            0,
            _name,
            _techStack,
            _desc,
            _video_url,
            _github_id,
            _addresses
        );
        userbuilds_map[msg.sender].push(project_id);
        project_id++;
        // now build created successfully
        }
        function submitbuild (uint _hack_id,uint _project_id) public {
            // for submitting build in my hacakthon project
            address payable[] memory my_add;
            hack_map[_hack_id].push(_project_id);
            hack_upvotes_map[_hack_id].push(pair(_project_id,my_add,0));
        }

        function getallbuilds() public view returns(build[] memory ) {
            // for getting all builds
            uint len=userbuilds_map[msg.sender].length;
            build[] memory my_builds=new build[](len);
            for (uint i = 0; i <len; i++) {
                my_builds[i]=build_arr[userbuilds_map[msg.sender][i]];// push
            }
            return my_builds;
        }

        function get_hack_builds(uint _hack_id)public view  returns (build[] memory) {
            uint len=hack_map[_hack_id].length;
            build[] memory my_builds=new build[](len);
            for (uint i = 0; i < len; i++) {
                my_builds[i]=build_arr[hack_map[_hack_id][i]];
            }
            return my_builds;
        }
        function upvoteProject(uint _hack_id,uint _project_id) external payable {
            pair[] storage pairs_array=hack_upvotes_map[_hack_id];
            for (uint256 i = 0; i < pairs_array.length; i++) {
                if (pairs_array[i].project_id==_project_id) {
                require(msg.value>=2,"Must Send Ether 1");
                    pairs_array[i].upvotes++;
                    emit deposit(msg.sender, msg.value);
                    pairs_array[i].upvoters.push(payable(msg.sender));
                    break;
                }
            }// update my array globally
            build memory my_build=build_arr[_project_id];
            my_build.upvotes++;
        }
        function getAllWinners(uint _hack_id) public view returns(pair[] memory) {
            uint nAwards=hackathons_arr[_hack_id].nAwards;
            pair[] memory winners=new pair[](nAwards) ;
            pair[] memory my_pairs_array=hack_upvotes_map[_hack_id];
            // we have to find top nAwards of my project
            for (uint i = 0; i < my_pairs_array.length-1; i++) {
                for (uint j = i+1; j < my_pairs_array.length; j++) {
                    if(my_pairs_array[i].upvotes>my_pairs_array[j].upvotes){
                        // then swap them
                        pair memory temp_pair=my_pairs_array[i];
                        my_pairs_array[i]=my_pairs_array[j];
                        my_pairs_array[j]=temp_pair;
                    }
                    // now this is my sorted pair after applying bubble sort
                }
            }
            for (uint256 i = 0; i < my_pairs_array.length; i++) {
                if(nAwards==0){
                    break;
                }
                winners[i]=(my_pairs_array[i]);
                nAwards--;
            }
            // edge case if my builds are smaller then my awards getting 
            return winners;
        }

    function getBalance()  public view returns(uint) {// for getting my contract balance
        return address(this).balance;
    }

        function end_hackathon(uint _hack_id)external payable{
            // now the winner is announced
            require(hackathons_arr[_hack_id].hack_owner==msg.sender,"Not The Owner Of hacakthon");
            pair[] memory winners=getAllWinners(_hack_id);
            // now giving money to all my winners
            // we have to distribute money in percentage 
            // uint total_prize=hackathons_arr[_hack_id].prizePool;
            uint[] memory prize_pool_array=hackathons_arr[_hack_id].prize_pool_array;
            // think should that prize pool array length is equal to my winners array
            // we have gooten all the project ids for the particular hacakthon now we have to distribute all the prizes
            for (uint i = 0; i < winners.length; i++) {
                uint winner_project_id=winners[i].project_id;
                build_arr[winner_project_id].upvotes+=5;
                address payable  build_owner=build_arr[winner_project_id].build_owner;
                build_owner.transfer(prize_pool_array[i]);
                emit transferPrize(build_owner, prize_pool_array[i]);
            }
            
            // now  my prize is distributed to all the winners
            // after that some amount is distributed to all the investors in my project
            for (uint i = 0; i < winners.length; i++) {
                address payable[] memory winner_project_investors=winners[i].upvoters;
                for (uint j = 0; j < winner_project_investors.length; j++) {
                    address payable investor_address=winner_project_investors[j];
                    investor_address.transfer(1);
                   emit  transferFund(investor_address, 1);
                }
            }
    // now marking the hacakthon end as true


        }
    }