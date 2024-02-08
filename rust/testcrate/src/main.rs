use chrono::prelude::*;

fn main() {
    let dt: DateTime<Local> = Local::now();
    println!("Hello ASL!");
    println!("{}", dt);
}
