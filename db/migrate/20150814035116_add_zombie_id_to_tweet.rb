class AddZombieIdToTweet < ActiveRecord::Migration
  def self.up
    add_column :tweets, :zombie_id, :integer
  end

  def self.down
    remove_column :tweets, :zombie_id
  end
end
